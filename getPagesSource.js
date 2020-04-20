// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }

    var parsedData = JSON.stringify(extractInfo(html))
    copyToClipboard(parsedData)
    alert(parsedData);
    return parsedData;
}

// html argument is expected to be a javascript string
function extractInfo(html) {
    var emails = Array.from(new Set(html.match(/\w+@\w+\.\w+/ig) || []))
    var phones = html.match(/tel:[\(\)0-9-\+ ]+/gi)
    if (!phones) return { emails: emails, phones: [] }
    var types = html.match(/<div class="_phone-type-position_17uwog">.+?<\/div>/gis).map(function (type) {
        return type.replace(/<.+?>/gs, "").trim()
    })
    var remarks = html.match(/<div class="_year-range-position_17uwog">.+?<\/div>/gis).map(function(remarks) {
       // console.log(remarks.replace(/<.+?>/gs, "").trim())
        try{
            return remarks.replace(/<.+?>/gs, "").trim().split("\n").map(function(element){
                return element.trim()
            }).join(" ")
        } catch(e) {
            return ""
        }
    })
    var phonesWithTypesAndRemarks = phones.map(function (phone, index) {
        var payload = { phone: phone.replace(/^tel:/, ""), type: types[index]}
        if(!!remarks[index]) payload.remarks = remarks[index]
        return payload
    })
    return { emails: emails, phones: phonesWithTypesAndRemarks }
}

function copyToClipboard(text) {
    var emailphone = document.createElement("textarea");
    document.body.appendChild(emailphone);
    emailphone.value = text;
    emailphone.select();
    document.execCommand("copy");
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});