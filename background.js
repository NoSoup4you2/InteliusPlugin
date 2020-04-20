chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
      }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
          alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
      });
});

function showAlert(){
    alert("This is a demo Alert");
}