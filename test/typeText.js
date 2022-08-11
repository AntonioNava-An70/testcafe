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

fixture`Getting Started`.page`https://www.unosquare.com/ContactUs`

test('Testing pressKey()', async (t) => {
	await t
		.maximizeWindow()
		.expect(Selector('input[name = "name"]').visible)
		.ok()
		.typeText('input[name = "name"]', 'My Name')
		.typeText('input[name = "email"]', 'Myemail@unosquare.com')
		.typeText('textarea[name = "message"]', 'The script can write a message!')
		.pressKey('backspace') // You can do backspace once
		.pressKey('backspace backspace') // or you can have multiple in the same method
		.wait(3000)
		.pressKey('home right . delete delete delete delete')
		.wait(10000)
})
