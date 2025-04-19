const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const inquirer = require('inquirer');

(async () => {
  const { fileName, instruction } = await inquirer.prompt([
    {
      name: 'fileName',
      message: 'Which file do you want to edit?',
    },
    {
      name: 'instruction',
      message: 'What should GPT-4 do to this file?',
    },
  ]);

  const fileContent = await fs.readFile(`../${fileName}`, 'utf8');

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://chat.openai.com');

  console.log('Please log in to ChatGPT in the browser window...');

  await page.waitForSelector('textarea', { timeout: 0 });

  const prompt = `Here is the content of ${fileName}:\n\n${fileContent}\n\nPlease ${instruction}. Respond with only the updated code.`;

  await page.type('textarea', prompt);
  await page.keyboard.press('Enter');

  console.log('Waiting for response...');

  await page.waitForSelector('[data-message-author-role="assistant"]', { timeout: 60000 });

  const elements = await page.$$('[data-message-author-role="assistant"]');
  const response = await page.evaluate(el => el.innerText, elements[elements.length - 1]);

  await fs.writeFile(`../${fileName}`, response);
  console.log(`✅ Updated ${fileName} successfully.`);

  await browser.close();
})();
