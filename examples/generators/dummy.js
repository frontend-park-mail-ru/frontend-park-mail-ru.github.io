'use strict';

const fs = require('fs');



fs.readFile('./files/list', 'utf8', function (err, text) {
	if (err) {
		return console.error(err);
	}
	const names = text.split('\n').filter(name => !!name);
	const files = {};
	let readed = names.length;

	names.forEach(name => {
		fs.readFile(`./files/${name}`, 'utf8', function (err, file) {
			if (err) {
				return console.error(err);
			}
			files[name] = file.trim();
			readed--;

			if (readed === 0) {
				fs.writeFile('result.txt', JSON.stringify(files, null, 4), 'utf-8', function (err) {
					if (err) {
						return console.error(err);
					}

					console.log('FINISH!');
					process.exit();
				})
			}
		});
	});
});
