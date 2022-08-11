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

fixture`Example`.page`https://devexpress.github.io/testcafe/example/`

test('Drag test', async (t) => {
	const triedCheckbox = Selector('label').withText('I have tried TestCafe')

	await t
		.click(triedCheckbox)
		.drag('#slider', 360, 0, { offsetX: 10, offsetY: 10 })
})
