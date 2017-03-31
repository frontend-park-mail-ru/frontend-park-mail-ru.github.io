'use strict';

const fs = require('fs');

function execute(generator, value) {
	const next = generator.next(value);
	if (!next.done) {
		next.value.then(
			result => execute(generator, result),
			err => generator.throw(err)
		);
	} else {
		console.log('FINISH!');
		process.exit();
	}
}
function read(file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, 'utf8', function (err, text) {
			if (err) {
				return reject(err);
			}
			resolve(text);
		});
	});
}
function write(file, source) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(file, source, 'utf8', function (err) {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
}

const gen = function *() {
	const list = yield read('./files/list');
	const names = list.split('\n').filter(name => !!name);
	const res = yield Promise.all(names.map(name => read(`./files/${name}`)));

	const files = {};
	names.forEach((name, pos) => files[name] = res[pos].trim());
	yield write('result2.txt', JSON.stringify(files));

};

execute(gen());
