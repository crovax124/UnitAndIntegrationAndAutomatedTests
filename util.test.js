const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("beschreibung was dieser test macht(in diesem fall test textoutput", () => {
  const text = generateText("Max", 12);
  expect(text).toBe("Max (12 years old)");
});

test("sollte data-less tex aufgeben", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

test("sollte einen getesteten text ausgeben", () => {
  const text = checkAndGenerate("Max", 15);
  expect(text).toBe("Max (15 years old)");
});

test("sollte anklicken", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///C:/Users/Eric/Desktop/100DaysOfCodeCSS/js-testing-introduction/index.html"
  );
  await page.click("input#name");
  await page.type("input#name", "Eric");
  await page.click("input#age");
  await page.type("input#age", "33");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Eric (33 years old)");
}, 10000);
