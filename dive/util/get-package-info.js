import path from "path";
import fs from "fs";

export function getPackageInfo() {
  const pacakgeJsonPath = path.join("package.json");

  const fileContent = fs.readFileSync(pacakgeJsonPath);
  return JSON.parse(fileContent);
}
