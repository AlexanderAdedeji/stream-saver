import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory of the Next.js project
const projectRoot = path.resolve(__dirname, "C:/Users/ALEX/Desktop/work/GrayStone/streamSaver/frontend");
console.log(`Project root: ${projectRoot}`);

/**
 * Recursively find all .tsx and .ts files under a given directory
 */
function findTsxFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) {
    console.warn(`Directory does not exist: ${dir}`);
    return results;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      results = results.concat(findTsxFiles(itemPath));
    } else if (itemPath.endsWith(".tsx") || itemPath.endsWith(".ts")) {
      results.push(itemPath);
    }
  }

  return results;
}

/**
 * Merge all .tsx and .ts files from multiple directories into a single output file
 */
function mergeTsxFiles(outputFile, subfolders) {
  try {
    let mergedContent = "";

    for (const subfolder of subfolders) {
      const folderPath = path.join(projectRoot, subfolder);
      console.log(`Checking folder: ${folderPath}`); // Debugging path
      if (fs.existsSync(folderPath)) {
        const tsxFiles = findTsxFiles(folderPath);
        console.log(`Found ${tsxFiles.length} .tsx/.ts files in '${subfolder}'. Merging...`);

        for (const file of tsxFiles) {
          const content = fs.readFileSync(file, "utf-8");
          mergedContent += `\n/* ===== File: ${file} ===== */\n`;
          mergedContent += content + "\n";
        }
      } else {
        console.warn(`Skipping non-existent folder: ${subfolder}`);
      }
    }

    fs.writeFileSync(outputFile, mergedContent, "utf-8");
    console.log(`\nAll .tsx/.ts files merged successfully into ${outputFile}\n`);
  } catch (error) {
    console.error("An error occurred while merging files:", error.message);
  }
}

// ------------------------------------------------------------
// Folders to scan in your Next.js project
// ------------------------------------------------------------
const foldersToScan = [
  "components",
  "adapters",
  "constants",
  "config",
  "app",
  "data",
  "domain",
  "guards",
  "helpers",
  "hooks",
  "lib",
  "models",
  "pages",
  "routes",
  "services",
  "store",
  "styles",
  "types",
  "utils",
];

// Output file path
const outputFile = path.join(__dirname, "admin-frontend.txt");

// Execute the merge
mergeTsxFiles(outputFile, foldersToScan);
