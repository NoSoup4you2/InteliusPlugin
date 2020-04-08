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
        emailphone.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  
  }
  function copytoclipboard() {
    var copyText = document.getElementById("emailphone");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert(copyText.value);
  }
  
  window.onload = onWindowLoad;