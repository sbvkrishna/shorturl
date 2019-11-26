var express = require('express');
var router = express.Router();
var Shorturl = require('../models/shorturl');


router.post('/new', (req, res) => {
	const originalURL = req.body.url;
	if (isValidURL(originalURL)) {
		// Check if URL is already shortened
		Shorturl.findOne({ originalURL }, (err, result) => {
			if (!err && result) res.json({ originalURL, "shortURL": result.shortURL })
			else {
				let newURL = getUnusedShorturl();
				Shorturl.create({ originalURL, shortURL: newURL }, (err, createdShortURL) => {
					if (err) console.log(err);
					else {
						res.json({ originalURL: createdShortURL.originalURL, "shortURL": createdShortURL.shortURL });
					}
				});
			}
		});
	}
	else {
		res.json({ "error": "invalid URL" });
	}
});

router.get('/:query', (req, res) => {
	const query = req.params.query;

	Shorturl.findOne({ shortURL: query }, (err, found) => {
		if (err) console.log(err);
		else if (!found) res.json({ error: 'Shorturl not found' });
		else res.redirect(found.originalURL);
	})
})

function getUnusedShorturl() {
	let alreadyExists, newURL;
	do {
		newURL = Math.floor(Math.random() * 10000);

		Shorturl.exists({ shortURL: newURL }, (err, res) => {
			if (err) console.log(err);
			else {
				if (!res) alreadyExists = false;
			}
		})
	}
	while (alreadyExists);
	return newURL;
}

function isValidURL(str) {
	// Check if it is valid
	var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	return regex.test(str);
}


module.exports = router;