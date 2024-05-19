# predefined_prompts

This is an Chromium browser plugin that allows the user to paste prompts to Copilot to save time. Currently there are two collections in this plugin:
- A collection of useful predefined prompts, including a super prompt to help users to have a better response from Copilot/Gemini/ChatGPT.
- The user can modify the prompt templates in settings.js.
- There are 4 templates to play with:
    - A prompt template dictionary with the template name as the key and prompts as the value.
    - A quiz template that ask the LLM to generate quiz for the topics.
    - A roles and audience template to set the role and audience for LLM for better context.

To install, clone this repo

`git clone git@github.com:scwong85/predefined_prompts.git`

Go to the browser extension setting page and switch on Developer mode.

Click `Load unpacked` button and select the repo directory that you just cloned.

The plugin can be accessed by right clicking in the chat box in Copilot to paste different prompts.

Remember to reload the extension from the browser extension setting and also reload the webpage when you change anything, such as settings.js
