const { readFileSync } = require("fs");
const { TEMPLATES_FILE_PATH } = require("../config/paths");

module.exports = async function listTemplates() {
  try {
    const templates = JSON.parse(readFileSync(TEMPLATES_FILE_PATH, "utf-8"));
    if (templates.length === 0) {
      console.log("No templates available.");
      return;
    }

    templates.forEach((template) => {
      console.log(
        `Name: ${template.name}, Description: ${template.description}`,
      );
    });
  } catch (error) {
    console.error("Error reading templates:", error.message);
  }
};
