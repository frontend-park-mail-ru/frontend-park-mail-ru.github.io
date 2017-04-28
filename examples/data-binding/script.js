'use strict';

class DataBinding {
	constructor(root) {
		this.root = root;
		this.binded = [];

		const store = {};
		const self = this;

		this.store = new Proxy(store, {
			get(target, key, receiver) {
				return Reflect.get(target, key, receiver);
			},
			set(target, key, value, receiver) {
				const res = Reflect.set(target, key, value, receiver);
				self.update(key);
				return res;
			}
		});

		this.to = {};
		this.from = {};
	}

	addListenerTo(el, source, type) {
		this.to[source] = this.to[source] || [];
		this.to[source].push({el, type});
	}

	addListenerFrom(el, source) {
		this.from[source] = this.from[source] || [];
		const eventHandler = function (e) {
			const newValue = el.value;
			this.store[source] = newValue;
		}.bind(this);
		el.addEventListener('change', eventHandler);
		el.addEventListener('input', eventHandler);
		this.from[source].push({el, eventHandler});
	}

	update(source) {
		const newValue = this.store[source];
		(this.to[source] || []).forEach(({el, type}) => el[type] = newValue);
	}

	start() {
		this.binded = [...root.querySelectorAll('[data-bind]')];

		this.binded.forEach(el => {
			const type = el.getAttribute('data-bind-type');
			const from = el.getAttribute('data-bind-source-from');
			const to = el.getAttribute('data-bind-source-to');

			if (from) {
				this.addListenerFrom(el, from);
			}

			if (to) {
				this.addListenerTo(el, to, type);
			}
		});

		console.dir(this.to);
		console.dir(this.from);


	}
}

const root = document.getElementById('root');

(new DataBinding).start(root);

