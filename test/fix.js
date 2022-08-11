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
		.expect(Selector('#select-folder').exists)
		.ok({ timeout: 5000 })
		.setFilesToUpload(Selector('#select-folder'), [
			'../automated.qa.postman_environment.json',
		])
})

test.page`https://devexpress.github.io/testcafe/example/`(
	'Taking Screenshot',
	async (t) => {
		await t.takeScreenshot().takeElementScreenshot('.col-2')
	}
)

test.page`https://www.unosquare.com/`('Assertions', async (t) => {
	await t
		.maximizeWindow()
		.expect(Selector('div.col-12>h2.subtitle').innerText)
		.contains('Testimonials'.toUpperCase(), 'Element contains "Testimonials"')
		.expect(Selector('div.col-12>h2.subtitle').innerText)
		.notContains(
			'Testimonials123'.toUpperCase(),
			'Element NOT contains "Testimonials123"'
		)
		.expect(Selector('div.col-12>h2.subtitle').innerText)
		.eql(
			'Testimonials'.toUpperCase(),
			'Element Text is equal to "Testimonials"'
		)
		.expect(Selector('h2.subtitle').count)
		.eql(2)
		.expect(Selector('header > div').getAttribute('class'))
		.eql('container-fluid', 'Checking the class name', { timeout: 500 })
		.expect(Selector('div.col-12>h2.subtitle').exists)
		.ok()
})
