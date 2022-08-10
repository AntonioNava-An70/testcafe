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

fixture`Getting Started`.page`https://www.unosquare.com/ContactUs`

test('My first test', async (t) => {
	await t
		.maximizeWindow()
		.expect(Selector('input[name = "name"]').visible)
		.ok()
		.typeText('input[name = "name"]', 'My Name')
		.typeText('input[name = "email"]', 'Myemail@unosquare.com')
		.typeText('textarea[name = "message"]', 'The script can write a message!')
		.scrollBy(0, -500)
		.click(
			Selector(
				getElementsByXPath(
					"//*[@id='navbarSupportedContent']//li//a[contains(@href, 'https://blog.unosquare.com')]"
				)
			)
		)
})
