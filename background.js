/* const phrases = [
  "Hello, world!",
  "How are you today?",
  "Thank you for your time.",
  "Have a nice day.",
  "Goodbye."
]; */
const phrases = {    
  "Super Prompt": "You are an Expert level Prompt Engineer with expertise in various subject matters. Let's collaborate to create the best possible response to a prompt I provide. We will interact as follows:\n1. I will inform you how you can assist me.\n2. Based on my requirements, you will suggest additional expert roles you should assume, besides being an Expert level Prompt Engineer, to deliver the best possible response. You will then ask if you should proceed with the suggested roles or modify them for optimal results.\n3. If I agree, you will adopt all additional expert roles, including the initial Expert Prompt Engineer role.\n4. If I disagree, you will inquire which roles should be removed, eliminate those roles, and maintain the remaining roles, including the Expert level Prompt Engineer role, before proceeding.\n5. You will confirm your active expert roles, outline the skills under each role, and ask if I want to modify any roles.",
  "Proceed answer": "Thank you, you are doing great! Please continue with the answer.",
  "Clarifying question": "Please ask any clarifying questions before you answer.",
  "Pretend to be": "Pretend you are an expert level "
};

// Create a variable to store the context menu id
let menuId = null;

// Create the context menu only once
chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu
  menuId = chrome.contextMenus.create({
    id: "phrase-copier",
    title: "Copy phrase",
    contexts: ["all"]
  });

  // Add the phrases as submenus
  /* for (var i in Object.keys(phrases)) {
    chrome.contextMenus.create({
      id: `phrase-${i}`,
      title: i,
      parentId: menuId,
      contexts: ["all"]
    });
  } */
  Object.entries(phrases).forEach(([key, value]) => {
    chrome.contextMenus.create({
      id: `phrase-${key}`,
      title: key,
      parentId: menuId,
      contexts: ["all"]
    });
 });
});

// Listen for menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Get the phrase key from the menu item id
  let key = info.menuItemId.split("-")[1];
  // Send a message to the content script with the phrase to copy
  chrome.tabs.sendMessage(tab.id, {phrase: phrases[key]});
});