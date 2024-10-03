const inquirer = require("inquirer");
const { writeFile, readFileSync } = require("fs");
const { TEMPLATES_FILE_PATH } = require("../config/paths");
const { fileExists } = require("../utils/fileUtils");

module.exports = async function addTemplate() {
  try {
    const questions = [
      { type: "input", name: "name", message: "Enter template name:" },
      {
        type: "input",
        name: "description",
        message: "Enter template description:",
      },
      {
        type: "input",
        name: "location",
        message: "Enter template file/folder path:",
      },
    ];

    const answers = await inquirer.prompt(questions);

    if (!fileExists(answers.location)) {
      console.log("Invalid file or folder path.");
      return;
    }

    const templates = JSON.parse(readFileSync(TEMPLATES_FILE_PATH, "utf-8"));
    templates.push(answers);

    writeFile(
      TEMPLATES_FILE_PATH,
      JSON.stringify(templates, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Template added successfully.");
      },
    );
  } catch (error) {
    console.error("Error adding template:", error.message);
  }
};
