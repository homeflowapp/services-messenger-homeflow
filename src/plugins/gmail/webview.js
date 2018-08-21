module.exports = (Thunder) => {
	const getMessages = function getMessages () {
		let count = 0

		if (document.getElementsByClassName('zA zE').length > 0) {
			count = document.getElementsByClassName('zA zE').length
		}

		if (document.getElementsByClassName('J-Ke n0').length > 0) {
			if (document.getElementsByClassName('J-Ke n0')[0].getAttribute('aria-label') != null) {
				count = parseInt(document.getElementsByClassName('J-Ke n0')[0].getAttribute('aria-label').replace(/[^0-9.]/g, ''), 10)
			}

			if (document.getElementsByClassName('J-Ke n0')[0].getAttribute('title') != null) {
				count = parseInt(document.getElementsByClassName('J-Ke n0')[0].getAttribute('title').replace(/[^0-9.]/g, ''), 10)
			}
		}

		if (isNaN(count)) {
			count = 0
		}

		Thunder.setBadge(count)
	}

	Thunder.loop(getMessages)
}
