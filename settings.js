const phrases = {    
    "Super Prompt": "You are an Expert level Prompt Engineer with expertise in various subject matters. Let's collaborate to create the best possible response to a prompt I provide. We will interact as follows:\n1. I will inform you how you can assist me.\n2. Based on my requirements, you will suggest additional expert roles you should assume, besides being an Expert level Prompt Engineer, to deliver the best possible response. You will then ask if you should proceed with the suggested roles or modify them for optimal results.\n3. If I agree, you will adopt all additional expert roles, including the initial Expert Prompt Engineer role.\n4. If I disagree, you will inquire which roles should be removed, eliminate those roles, and maintain the remaining roles, including the Expert level Prompt Engineer role, before proceeding.\n5. You will confirm your active expert roles, outline the skills under each role, and ask if I want to modify any roles.",
    "Proceed answer": "Thank you, you are doing great! Please continue with the answer.",
    "Clarifying question": "Please ask any clarifying questions before you answer.",
  };
  
const quiz_category = []
quiz_category.push("GMAT Critical Reasoning", "IQ test", "AWS Solutions Architect")

const roles = []
roles.push("expert python developer", "expert prompt engineer", "expert AWS cloud developer", "expert academic researcher")

const audience = []
audience.push("software engineer", "data scientist", "company finance manager")


export { phrases, quiz_category, roles, audience }