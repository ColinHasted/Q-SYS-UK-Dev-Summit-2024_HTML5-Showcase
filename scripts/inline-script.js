const fs = require("fs");
const path = require("path");

// Paths
const distDir = path.join(
  __dirname,
  "./../dist/dunstable-experience-centre/browser"
);
const indexPath = path.join(distDir, "index.html");

// Function to inline scripts

let indexContent = fs.readFileSync(indexPath, "utf8");

// Regular expression to find all <script> tags with src attribute
const scriptTagRegex =
  /<script\s+src="([^"]+)"\s*(type="module")?( defer)?\s*><\/script>/g;
let match;
const scriptTags = [];

// Collect all script tags
while ((match = scriptTagRegex.exec(indexContent)) !== null) {
  const scriptSrc = match[1];
  const scriptType = match[2] ? "module" : "text/javascript";
  const isDefer = !!match[3];
  const scriptFullPath = path.join(distDir, scriptSrc);

  if (!isDefer && scriptType === "module") {
    // Read script content for module type
    const scriptContent = fs.readFileSync(scriptFullPath, "utf8");
    scriptTags.push(`<script type="module">\n${scriptContent}\n</script>`);
  } else {
    // Keep defer scripts unchanged
    scriptTags.push(match[0]);
  }

  // Temporarily remove the original <script> tag from the content
  // Use a more unique placeholder
  indexContent = indexContent.replace(
    match[0],
    `<!-- script-placeholder-${scriptTags.length - 1} -->`
  );
}

// Replace placeholders with the script tags in the same order
scriptTags.forEach((scriptTag, index) => {
  // Use the unique placeholder format for replacement
  indexContent = indexContent.replace(
    `<!-- script-placeholder-${index} -->`,
    scriptTag
  );
});

// Write modified content back to index.html
fs.writeFileSync(indexPath, indexContent, "utf8");
console.log("Scripts have been inlined successfully.");
