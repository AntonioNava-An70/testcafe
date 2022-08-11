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

fixture`Example`.page`https://www.file.io/`

test('Upload a file Test', async (t) => {
	await t
		.wait(4000)
		.setFilesToUpload(Selector('#select-folder'), [
			'../automated.qa.postman_environment.json',
		])
		.wait(4000)
})

test.page`https://devexpress.github.io/testcafe/example/`(
	'Taking Screenshot',
	async (t) => {
		await t.wait(3000).takeScreenshot().takeElementScreenshot('.col-2')
	}
)
