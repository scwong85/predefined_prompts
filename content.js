// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == "breaklimit") {
        let x = document.getElementById("b_sydConvCont")
        let y = x.getElementsByClassName("cib-serp-main")[0]
        y.shadowRoot.getElementById("cib-action-bar-main").shadowRoot.querySelector("cib-text-input").shadowRoot.querySelector("textarea").maxLength = 100000
    }
    else {
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
    }

  });