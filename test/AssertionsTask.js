//
// Verify Recent Posts and Popular Posts feature works correctly
// Verify that Categories feature works correctly

// Acceptance criteria:

// Use at least 4 different Assertions
// Validate 3 given features
// Apply Maximize screen method
// Use Xpaths and CSS Selectors
// Take Screenshots
// Use Waits

import { Selector } from "testcafe";

const getElementsByXPath = Selector((xpath) => {
  const iterator = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null
  );
  const items = [];
  let item = iterator.iterateNext();
  while (item) {
    items.push(item);
    item = iterator.iterateNext();
  }
  return items;
});
export default function (xpath) {
  return Selector(getElementsByXPath(xpath));
}

fixture`Getting Started`;

fixture`Getting Started`.page`https://www.unosquare.com`;

test.page`https://blog.unosquare.com/tag/software-development`(
  "Verify the Search feature works correctly",
  async (t) => {
    await t
      .maximizeWindow()
      .typeText('input[id="search-bar"]', "Feature Flag")
      .expect(Selector('input[id="search-bar"]').value)
      .contains("Feature Flag")
      .wait(3000)
      .takeScreenshot()
      .takeElementScreenshot('input[id="search-bar"]')
      .click(Selector(getElementsByXPath('//button[@type="submit"]')))
      .expect(
        Selector(getElementsByXPath('//h3[@class="results-title"]')).visible
      )
      .ok()
      .expect(
        Selector(getElementsByXPath('//h3[@class="results-title"]')).innerText
      )
      .contains('RESULTS FOUND FOR THE SEARCH TERM "Feature Flag"');
  }
);

test.page`https://blog.unosquare.com/`(
  "Verify Recent Posts and Popular Posts feature works correctly",
  async (t) => {
    await t
      .maximizeWindow()
      .expect(Selector('label[for="tab1"]').innerText)
      .contains("RECENT POST")
      .click('label[for="tab1"]')
      .expect(Selector('section[id="content1"]').visible)
      .ok()
      .wait(1500)
      .takeScreenshot()
      .takeElementScreenshot('section[id="content1"]')
      .expect(Selector('label[for="tab2"]').innerText)
      .contains("POPULAR POST")
      .click('label[for="tab2"]')
      .expect(Selector('section[id="content2"]').visible)
      .ok()
      .wait(1500)
      .takeScreenshot()
      .takeElementScreenshot('section[id="content2"]')
    
  }
);

test.page`https://blog.unosquare.com/`(
  "Verify that Categories feature works correctly",
  async (t) => {
    await t
      .maximizeWindow()
      .expect(Selector('h4[class="categories-title"]').exists)
      .ok()
      .expect(Selector('h4[class="categories-title"]').innerText)
      .eql("CATEGORIES")
      .wait(1000)
      .takeScreenshot()
      .expect(Selector('div[class="categories-container"]').count)
      .gt(12);
  }
);
