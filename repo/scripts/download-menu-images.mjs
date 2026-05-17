import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'assets', 'menu-images');

const dishes = [
  { slug: 'tacos-de-trompo', query: 'tacos de trompo' },
  { slug: 'tacos-de-trompo-con-queso', query: 'tacos de trompo con queso' },
  { slug: 'tacos-de-bistec-con-queso', query: 'tacos de bistec con queso' },
  { slug: 'tacos-de-bistec-con-queso-grande', query: 'tacos de bistec con queso grande' },
  { slug: 'chingas', query: 'chingas tacos' },
  { slug: 'chingas-con-queso', query: 'chingas con queso' },
  { slug: 'pirata', query: 'pirata tacos' },
  { slug: 'pirata-con-queso', query: 'pirata con queso' },
  { slug: 'pirata-grande', query: 'pirata grande tacos' },
  { slug: 'gringa', query: 'gringa taco' },
  { slug: 'gringa-grande', query: 'gringa grande taco' },
  { slug: 'torta-con-trompo', query: 'torta con trompo' },
  { slug: 'torta-mixta', query: 'torta mixta' },
  { slug: 'torta-con-arrachera', query: 'torta con arrachera' },
  { slug: 'salchitrompo', query: 'salchitrompo' },
  { slug: 'taquitos-de-bistec-con-queso', query: 'taquitos de bistec con queso' },
  { slug: 'papa-con-trompo', query: 'papa con trompo' },
  { slug: 'papa-sencilla', query: 'papa sencilla' },
  { slug: 'papas-sencillas', query: 'papas sencillas' },
  { slug: 'papas-con-bistec', query: 'papas con bistec' },
  { slug: 'papas-mixtas', query: 'papas mixtas' },
  { slug: 'hamburguesa-sencilla', query: 'hamburguesa sencilla' },
  { slug: 'hamburguesa-con-bistec', query: 'hamburguesa con bistec' },
  { slug: 'hamburguesa-hawaiana', query: 'hamburguesa hawaiana' },
  { slug: 'hamburguesa-lite', query: 'hamburguesa lite' },
  { slug: 'hamburguesa-c-bistec', query: 'hamburguesa con bistec' },
  { slug: 'torta-hawaiana', query: 'torta hawaiana' },
  { slug: 'frijoles-charros-sencillos', query: 'frijoles charros sencillos' },
  { slug: 'frijoles-preparados-con-bistec', query: 'frijoles preparados con bistec' },
  { slug: 'frijoles-preparados-mixtos', query: 'frijoles preparados mixtos' },
  { slug: 'con-trompo', query: 'frijoles con trompo' }
];

const headless = process.env.HEADLESS !== 'false';
const timeoutMs = Number(process.env.TIMEOUT_MS || 20000);
const downloadLimit = Number(process.env.DOWNLOAD_LIMIT || dishes.length);
const manifest = [];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, filePath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const stream = createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', resolve);
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function findImageUrl(driver) {
  const candidates = await driver.findElements(By.css('img'));
  for (const img of candidates) {
    const src = await img.getAttribute('src');
    if (!src) continue;
    if (src.startsWith('data:')) continue;
    if (src.includes('gstatic') || src.includes('googleusercontent') || src.includes('bing') || src.includes('images.unsplash.com')) return src;
  }
  return null;
}

async function fetchAndSave(driver, query, filePath) {
  const urls = [
    `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`,
    `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`
  ];
  let imageUrl = null;
  for (const target of urls) {
    await driver.get(target);
    await driver.wait(until.elementLocated(By.css('body')), timeoutMs);
    await driver.sleep(1800);
    imageUrl = await findImageUrl(driver);
    if (imageUrl) break;
  }
  if (!imageUrl) throw new Error(`No image URL found for ${query}`);
  await downloadFile(imageUrl, filePath);
  manifest.push({ query, file: path.relative(projectRoot, filePath), url: imageUrl });
}

async function main() {
  await ensureDir(outputDir);

  const options = new chrome.Options();
  if (headless) options.addArguments('--headless=new');
  options.addArguments('--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,1200');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    for (const dish of dishes.slice(0, downloadLimit)) {
      const filePath = path.join(outputDir, `${dish.slug}.jpg`);
      console.log(`Downloading ${dish.query} -> ${filePath}`);
      await fetchAndSave(driver, dish.query, filePath);
    }
    await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  } finally {
    await driver.quit();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
