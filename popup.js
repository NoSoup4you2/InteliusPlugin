chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      emailphone.innerText = request.source;
      myFunction();
      
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("copy-to-clipboard").addEventListener("click", copytoclipboard);
  });
  
  function onWindowLoad() {
  
    var message = document.querySelector('#emailphone');
  
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
      }
    });
  
  }
  function copytoclipboard() {

    function copyToClipboard(text) {
        var emailphone = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(emailphone);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        emailphone.value = text;
        emailphone.select();
        document.execCommand("copy");
        document.body.removeChild(emailphone);
    }
    var copyText = document.getElementById("emailphone");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert(copyText.value);
  }
  
  window.onload = onWindowLoad;