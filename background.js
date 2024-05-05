const phrases = {    
  "Super Prompt": "You are an Expert level Prompt Engineer with expertise in various subject matters. Let's collaborate to create the best possible response to a prompt I provide. We will interact as follows:\n1. I will inform you how you can assist me.\n2. Based on my requirements, you will suggest additional expert roles you should assume, besides being an Expert level Prompt Engineer, to deliver the best possible response. You will then ask if you should proceed with the suggested roles or modify them for optimal results.\n3. If I agree, you will adopt all additional expert roles, including the initial Expert Prompt Engineer role.\n4. If I disagree, you will inquire which roles should be removed, eliminate those roles, and maintain the remaining roles, including the Expert level Prompt Engineer role, before proceeding.\n5. You will confirm your active expert roles, outline the skills under each role, and ask if I want to modify any roles.",
  "Proceed answer": "Thank you, you are doing great! Please continue with the answer.",
  "Clarifying question": "Please ask any clarifying questions before you answer.",
  "Pretend to be": "Pretend you are an expert level "
};

const quiz_category = []
quiz_category.push("GMAT Critical Reasoning", "IQ test", "AWS Solutions Architect")

// Create a variable to store the context menu id
let menuId = null;

// Create the context menu only once
chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu
  menuId = chrome.contextMenus.create({
    id: "phrase-copier",
    title: "Paste prompts",
    contexts: ["all"]
  });

  // Quiz context menu
  quizId = chrome.contextMenus.create({
    id: "quiz",
    title: "Create quiz for",
    contexts: ["all"]
  });

  // Limit breaker context memnu
  limitBreakerId = chrome.contextMenus.create({
    id: "limit-breaker",
    title: "Break Bing Text Area Limit",
    contexts: ["all"]
  });

  // Add the phrases as submenus
  Object.entries(phrases).forEach(([key, value]) => {
    chrome.contextMenus.create({
      id: `phrase-${key}`,
      title: key,
      parentId: menuId,
      contexts: ["all"]
    });
  });

  // Add the quiz as submenus
  quiz_category.forEach(function (item, index) {  
    chrome.contextMenus.create({
      id: `quiz-${item}`,
      title: item,
      parentId: quizId,
      contexts: ["all"]
    });
  });
  
});

// Listen for menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Get the phrase key from the menu item id
  if (info.menuItemId == "limit-breaker") {
    chrome.tabs.sendMessage(tab.id, "breaklimit");
  } else if (info.menuItemId.includes("phrase")) {
    var key = info.menuItemId.split("-")[1];
    // Send a message to the content script with the phrase to copy
    chrome.tabs.sendMessage(tab.id, {phrase: phrases[key]});
  } else if (info.menuItemId.includes("quiz")) {
    var quiz = info.menuItemId.split("-")[1];
    var quiz_prompt = `Simulate questions for ${quiz}. For each round, come up with a multiple choice questions with 5 possible answers (a,b,c,d,e). There is only one correct answer. For each correct answer, award 2 points. Create 10 rounds of questions. Accumulate the points from each round and display the total accumulated points for each round. Do not show the answer before I answer the question. Wait for my response in each round before asking the next question. After I answer a question, don't wait for any confirmation, just display the next question. Do not repeat the question. Please give explanation for each possible answer why they are correct or why they are wrong. At the end of the game, display total points and ask if I want to play again`
    // Send a message to the content script with the phrase to copy
    chrome.tabs.sendMessage(tab.id, {phrase: quiz_prompt});
  } else {
    chrome.tabs.sendMessage(tab.id, {phrase: `Hello Copilot ${info.menuItemId}`});
  }



});