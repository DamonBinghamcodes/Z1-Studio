import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';

(async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['Edit existing file', 'Create new file'],
    },
  ]);

  const { fileName, instruction } = await inquirer.prompt([
    {
      name: 'fileName',
      message: 'Enter the file name (e.g., index.html):',
    },
    {
      name: 'instruction',
      message: 'What should GPT-4 do to this file?',
    },
  ]);

  const filePath = path.resolve('..', fileName);
  const exists = fs.existsSync(filePath);

  let content = '';
  if (action === 'Edit existing file') {
    if (!exists) {
      console.log(chalk.red(`❌ File ${fileName} not found.`));
      return;
    }
    content = await fs.readFile(filePath, 'utf8');
    const backupPath = filePath + '.bak';
    await fs.copyFile(filePath, backupPath);
    console.log(chalk.yellow(`🔒 Backup created at ${backupPath}`));
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://chat.openai.com');

  console.log(chalk.cyan('⚠️ Please log in to ChatGPT in the browser window...'));
  await page.waitForSelector('textarea', { timeout: 0 });

  const prompt = action === 'Edit existing file'
    ? `Here is the content of ${fileName}:\n\n${content}\n\nPlease ${instruction}. Respond with only the updated code.`
    : `Create a new file called ${fileName}. Please ${instruction}. Respond with only the file contents.`;

  await page.type('textarea', prompt);
  await page.keyboard.press('Enter');

  console.log(chalk.blue('🤖 Waiting for GPT response...'));

  await page.waitForSelector('[data-message-author-role="assistant"]', { timeout: 60000 });
  const messages = await page.$$('[data-message-author-role="assistant"]');
  const response = await page.evaluate(el => el.innerText, messages[messages.length - 1]);

  await fs.writeFile(filePath, response);
  console.log(chalk.green(`✅ ${action === 'Edit existing file' ? 'Updated' : 'Created'} ${fileName} successfully.`));

  await browser.close();
})();
