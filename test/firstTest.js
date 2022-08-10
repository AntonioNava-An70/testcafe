import { Selector } from 'testcafe'

const getElementsByXPath = Selector((xpath) => {
	const iterator = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
		null
	)
	const items = []
	let item = iterator.iterateNext()
	while (item) {
		items.push(item)
		item = iterator.iterateNext()
	}
	return items
})
export default function (xpath) {
	return Selector(getElementsByXPath(xpath))
}

fixture`Getting Started`

fixture`Getting Started`.page`https://www.unosquare.com`

test('Complete the flow Unosquare page', async (t) => {
	await t
		.maximizeWindow()
		// Go to Unosquare.com
		.click(
			Selector(
				getElementsByXPath(
					'//*[@id="navbarSupportedContent"]/ul/li/a[contains(text(),"Contact Us")]'
				)
			)
		)
		// Go to Contact Us and fill Name, Email and Message
		.expect(Selector('input[name = "name"]').visible)
		.ok()
		.typeText('input[name = "name"]', 'Full Name')
		.typeText('input[name = "email"]', 'username@unosquare.com')
		.scrollBy(0, -500)
		// Go to Blog

		.click(
			Selector(
				getElementsByXPath(
					"//*[@id='navbarSupportedContent']//li//a[contains(@href, 'https://blog.unosquare.com')]"
				)
			)
		)
		// Search for "WHAT IS QA TESTING?"
		.typeText('input[id="search-bar"]', 'WHAT IS QA TESTING?')
		.click(
			Selector(
				getElementsByXPath('//div[@id="side-bar-container"]/form/button')
			)
		)
		// Verify it returns a result
		.expect(
			Selector(getElementsByXPath('//div[@id="wrapper"]/header/div/div/div/h3'))
				.visible
		)
		.ok()
		// Go to Services and Scroll to the bottom of the page
		.click(
			Selector(
				getElementsByXPath(
					"//*[@id='navbarSupportedContent']//li//a[contains(@href, 'https://www.unosquare.com/Services')]"
				)
			)
		)
		// .scroll(0, 10000)
		// // .scrollIntoView(
		// // 	'//div[@class="calltoaction"]//a[@href="https://store.unosquare.com/"]'
		// // )
		// Verify that you see the Blue button with the text "Store"
		.expect(
			Selector(
				getElementsByXPath(
					'/html/body/footer/div[1]/div/div[4]/div[2]/a[contains(text(), "Store")]'
				)
			).visible
		)
		.ok()
})

test.page('www.google.com')(
	'Google Search for Testcafe official page',
	async (t) => {
		// Go to www.google.com
		await t

			.maximizeWindow()
			// Search for Test Cafe Automation
			.expect(Selector('input[name = "q"]').visible)
			.ok()
			.typeText('input[name = "q"]', 'Test Cafe Automation')
			.pressKey('enter')
			// Click on the official page of test cafe

			.click('a[href="https://testcafe.io/"]')
			// Verify "Getting Started" menu element is present

			// Verify it returns a result
			.expect(
				Selector(
					getElementsByXPath('//nav//ul//li//a[contains(text(),"Docs")]')
				).visible
			)
			.ok()
	}
)
