// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (!navigator.clipboard){
        // Get the phrase from the message
        let phrase = message.phrase;
        // Create a temporary element to hold the phrase
        let temp = document.createElement("textarea");
        temp.value = phrase;
        document.body.appendChild(temp);
        // Select and copy the phrase
        temp.select();
        document.execCommand("copy");
        // Remove the temporary element
        document.body.removeChild(temp);
    } else{
        navigator.clipboard.writeText(message.phrase).then(
            function(){
                document.execCommand("insertText", false, message.phrase);
            })
          .catch(
             function() {
                
          });
    } 
  });