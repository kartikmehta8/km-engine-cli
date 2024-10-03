const fs = require("fs").promises;
const path = require("path");
const { TEMPLATES_FILE_PATH } = require("../config/paths");
const cliProgress = require("cli-progress");

async function copyDirectory(src, dest, progressBar) {
  try {
    const entries = await fs.readdir(src, { withFileTypes: true });

    await fs.mkdir(dest, { recursive: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath, progressBar);
      } else {
        await fs.copyFile(srcPath, destPath);
        progressBar.increment();
      }
    }
  } catch (error) {
    console.error("Error copying directory:", error.message);
    throw error;
  }
}

module.exports = async function useTemplate(name) {
  try {
    const templates = JSON.parse(
      await fs.readFile(TEMPLATES_FILE_PATH, "utf-8"),
    );
    const template = templates.find((t) => t.name === name);

    if (!template) {
      console.log(`Template "${name}" not found.`);
      return;
    }

    const destination = path.join(
      process.cwd(),
      path.basename(template.location),
    );

    const stats = await fs.stat(template.location);

    const totalFiles = await countFiles(template.location);

    const progressBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic,
    );
    progressBar.start(totalFiles, 0);

    if (stats.isDirectory()) {
      await copyDirectory(template.location, destination, progressBar);
    } else {
      await fs.copyFile(template.location, destination);
      progressBar.increment();
    }

    progressBar.stop();
    console.log(`Template "${name}" cloned to the current directory.`);
  } catch (error) {
    console.error("Error using template:", error.message);
  }
};

async function countFiles(dir) {
  let count = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (let entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += await countFiles(entryPath);
    } else {
      count += 1;
    }
  }

  return count;
}
