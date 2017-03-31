'use strict';

export default function(...strings) {
	console.log([...new Set(strings).values()]);
}
