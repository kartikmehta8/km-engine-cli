const { writeFile, readFileSync } = require("fs");
const { TEMPLATES_FILE_PATH } = require("../config/paths");

module.exports = async function deleteTemplate(name) {
  try {
    const templates = JSON.parse(readFileSync(TEMPLATES_FILE_PATH, "utf-8"));
    const updatedTemplates = templates.filter(
      (template) => template.name !== name,
    );

    if (templates.length === updatedTemplates.length) {
      console.log(`Template "${name}" not found.`);
      return;
    }

    writeFile(
      TEMPLATES_FILE_PATH,
      JSON.stringify(updatedTemplates, null, 2),
      (err) => {
        if (err) throw err;
        console.log(`Template "${name}" deleted successfully.`);
      },
    );
  } catch (error) {
    console.error("Error deleting template:", error.message);
  }
};
