import { phrases, quiz_category, roles, audience } from "./settings.js";

// Create a variable to store the context menu id
let menuId = null;
let quizId = null;
let roleId = null;
// let limitBreakerId = null;
let audienceId = null;

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

  roleId = chrome.contextMenus.create({
    id: "role",
    title: "Assume the role of",
    contexts: ["all"]
  });

  audienceId = chrome.contextMenus.create({
    id: "audience",
    title: "Target audience is",
    contexts: ["all"]
  });

  // Limit breaker context memnu
  // limitBreakerId = chrome.contextMenus.create({
  //   id: "limit-breaker",
  //   title: "Break Bing Text Area Limit",
  //   contexts: ["all"]
  // });

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

  // Add the roles as submenus
  roles.forEach(function (item, index) {
    chrome.contextMenus.create({
      id: `role-${item}`,
      title: item,
      parentId: roleId,
      contexts: ["all"]
    });
  });

  // Add the target audience as submenus
  audience.forEach(function (item, index) {
    chrome.contextMenus.create({
      id: `audience-${item}`,
      title: item,
      parentId: audienceId,
      contexts: ["all"]
    });
  });


  
});

// Listen for menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Get the phrase key from the menu item id
  /* if (info.menuItemId == "limit-breaker") {
    chrome.tabs.sendMessage(tab.id, "breaklimit");
  } else  */if (info.menuItemId.includes("phrase")) {
    var key = info.menuItemId.split("-")[1];
    // Send a message to the content script with the phrase to copy
    chrome.tabs.sendMessage(tab.id, {phrase: phrases[key]});
  } else if (info.menuItemId.includes("quiz")) {
    var quiz = info.menuItemId.split("-")[1];
    var quiz_prompt = `Simulate questions for ${quiz}. For each round, come up with a multiple choice questions with 5 possible answers (a,b,c,d,e). There is only one correct answer. For each correct answer, award 2 points. Create 10 rounds of questions. Accumulate the points from each round and display the total accumulated points for each round. Do not show the answer before I answer the question. Wait for my response in each round before asking the next question. After I answer a question, don't wait for any confirmation, just display the next question. Do not repeat the question. Please give explanation for each possible answer why they are correct or why they are wrong. At the end of the game, display total points and ask if I want to play again`
    // Send a message to the content script with the phrase to copy
    chrome.tabs.sendMessage(tab.id, {phrase: quiz_prompt});
  } else if (info.menuItemId.includes("role")) {
    var role = info.menuItemId.split("-")[1];
    var role_prompt = `Assume the role of ${role} and help me with the following problems:`
    // Send a message to the content script with the phrase to copy
    chrome.tabs.sendMessage(tab.id, {phrase: role_prompt});
  } else if (info.menuItemId.includes("audience")) {
    var audience = info.menuItemId.split("-")[1];
    var audience_prompt = `The target audience for this prompt is ${audience}.`
    // Send a message to the content script with the phrase to copy
    chrome.tabs.sendMessage(tab.id, {phrase: audience_prompt});
  } else {
    chrome.tabs.sendMessage(tab.id, {phrase: `Hello Copilot ${info.menuItemId}`});
  }



});