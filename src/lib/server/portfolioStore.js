import { promises as fs } from "fs";
import path from "path";
import { defaultPortfolioContent } from "../../app/data/portfolioContent";

const contentFilePath = path.join(process.cwd(), "data", "portfolio-content.json");

const isObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const mergeContent = (base, override) => {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }

  if (!isObject(base)) {
    return override ?? base;
  }

  const result = { ...base };

  Object.keys(base).forEach((key) => {
    result[key] = mergeContent(base[key], override?.[key]);
  });

  if (isObject(override)) {
    Object.keys(override).forEach((key) => {
      if (!(key in result)) {
        result[key] = override[key];
      }
    });
  }

  return result;
};

async function ensureContentFile() {
  await fs.mkdir(path.dirname(contentFilePath), { recursive: true });

  try {
    await fs.access(contentFilePath);
  } catch {
    await fs.writeFile(contentFilePath, JSON.stringify(defaultPortfolioContent, null, 2), "utf8");
  }
}

export async function readPortfolioContent() {
  await ensureContentFile();

  try {
    const raw = await fs.readFile(contentFilePath, "utf8");
    const parsed = raw.trim() ? JSON.parse(raw) : {};
    return mergeContent(defaultPortfolioContent, parsed);
  } catch (error) {
    console.error("Failed to read portfolio content file.", error);
    return defaultPortfolioContent;
  }
}

export async function writePortfolioContent(content) {
  await ensureContentFile();
  const merged = mergeContent(defaultPortfolioContent, content);
  await fs.writeFile(contentFilePath, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}
