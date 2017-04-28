'use strict';

class VDOM {

	static el(type, props, ...children) {
		return {type, props, children};
	}

	static createElement(node) {
		if (typeof node === 'string') {
			return document.createTextNode(node);
		}
		const $el = document.createElement(node.type);
		VDOM.setProps($el, node.props);
		node.children
			.map(VDOM.createElement)
			.forEach($el.appendChild.bind($el));
		return $el;
	}

	static changed(node1, node2) {
		return typeof node1 !== typeof node2 ||
			typeof node1 === 'string' && node1 !== node2 ||
			node1.type !== node2.type
	}

	static updateElement($parent, newNode, oldNode, index = 0) {
		if (!oldNode) {
			$parent.appendChild(
				VDOM.createElement(newNode)
			);
		} else if (!newNode) {
			$parent.removeChild(
				$parent.childNodes[index]
			);
		} else if (VDOM.changed(newNode, oldNode)) {
			$parent.replaceChild(
				VDOM.createElement(newNode),
				$parent.childNodes[index]
			);
		} else if (newNode.type) {
			VDOM.updateProps(
				$parent.childNodes[index],
				newNode.props,
				oldNode.props
			);
			const newLength = newNode.children.length;
			const oldLength = oldNode.children.length;
			for (let i = 0; i < newLength || i < oldLength; i++) {
				VDOM.updateElement(
					$parent.childNodes[index],
					newNode.children[i],
					oldNode.children[i],
					i
				);
			}
		}
	}


	static setProp($target, name, value) {
		$target.setAttribute(name, value);
	}

	static removeProp($target, name) {
		$target.removeAttribute(name);
	}

	static setProps($target, props) {
		Object.keys(props).forEach(name => {
			VDOM.setProp($target, name, props[name]);
		});
	}

	static updateProp($target, name, newVal, oldVal) {
		if (!newVal) {
			VDOM.removeProp($target, name);
		} else if (!oldVal || newVal !== oldVal) {
			VDOM.setProp($target, name, newVal);
		}
	}

	static updateProps($target, newProps, oldProps = {}) {
		const props = Object.assign({}, newProps, oldProps);
		Object.keys(props).forEach(name => {
			VDOM.updateProp($target, name, newProps[name], oldProps[name]);
		});
	}
}

class App {
	constructor() {
		this._list = [];
		this._id = 0;
	}

	sort() {
		const max = this._list.reduce((max, {score}) => Math.max(max, score), 0);
		this._list = this._list
			.sort(({score: l}, {score: r}) => r - l)
			.map(el => Object.assign({}, el, {part: max === 0 ? 0 : (((el.score / max) * 5 ) | 0) * 20}));
	}

	addUser(name) {
		this._list.push({name, score: 0, part: 0.0, _id: `#${++this._id}`});
	}

	putScores(name, scores) {
		this._list = this._list.map(user => {
			if (user.name === name) {
				user = Object.assign({}, user, {score: user.score + scores});
			}
			return user;
		});
	}

	toVDOM() {
		this.sort();
		const header = VDOM.el('h1', {'class': 'application__header'}, `Список пользователей`);
		const subHeader = VDOM.el('h2', {'class': 'application__sub-header'}, `Количество пользователей: ${this._list.length}`);

		const list = VDOM.el('ul', {'class': 'application__list list'}, ...this._list.map(item => {
			return VDOM.el('li', {'class': 'list__item user-info', _id: item._id},
				VDOM.el('div', {'class': 'user-info__username'}, `${item.name} \u2014 ${item.score}`),
				VDOM.el('div', {'class': 'user-info__chart', style: `width: ${item.part}%;`}, ``)
			);
		}));

		return VDOM.el('main', {'class': 'application'},
			header,
			subHeader,
			list
		);
	}

	toHTML() {
		this.sort();
		const header = `<h1 class='application__header'>Список пользователей</h1>`;
		const subHeader = `<h2 class='application__sub-header'>Количество пользователей: ${this._list.length}</h2>`;

		const list = `<ul class='application__list list'>
${this._list
			.map(item => {
				return `<li class='list__item user-info' data-id='${item._id}'>
<div class='user-info__username'>${item.name} &mdash; ${item.score}</div>
<div class='user-info__chart' style='width: ${item.part}%;'></div>
</li>`;

			})
			.join('\n')}
</ul>`;

		return `<main class='application'>${header}${subHeader}${list}</main>`;
	}
}


class Bench {
	constructor() {
		Bench.users = ['Алехин Владислав', 'Артюхов Владислав', 'Асриян Эдуард', 'Байрамуков Ян', 'Балякин Данила', 'Буклин Сергей', 'Буторин Сергей', 'Валитов Ришат', 'Ваняшкин Юрий', 'Виноградов Андрей', 'Володин Сергей', 'Вязьмин Илья', 'Гаджиев Магомед', 'Говязин Сергей', 'Злобина Светлана', 'Иевлев Алгыс', 'Кадырбеков Данияр', 'Камакин Андрей', 'Каширин Максим', 'Клюквин Артём', 'Колотовкин Максим', 'Крестов Сергей', 'Круглов Вячеслав', 'Крылов Сергей', 'Кучаева Карина', 'Лукьянова Ирина', 'Набережный Алексей', 'Набоков Денис', 'Орёл Александр', 'Перескоков Владислав', 'Пешков Сергей', 'Прокопчук Никита', 'Рогачев  Семён', 'Салып Богдан', 'Семенов Антон', 'Семенова Екатерина', 'Солдатов Кирилл', 'Степанов Денис', 'Ступин Никита', 'Федорова Варвара', 'Фомичев Егор', 'Чернов Андрей', 'Шелавин Илья', 'Якубов Алексей'];
		Bench.selected = [];
		Bench.iterations = 1e4;
	}

	static random(min, max, k = 1) {
		let rand = min + Math.pow(Math.random(), k) * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	}

	bench() {
		this.app = new App();
		this.name = null;

		this.app.addUser('sawoder');
		this.app.putScores('sawoder', 666);
		Bench.selected.push('sawoder');

		this.init(this.app);
		const addFactor = (Bench.users.length * 0.99) / Bench.iterations;

		console.time(this.name || 'Bench');

		for (let i = 0; i < Bench.iterations; i++) {
			if (Math.random() < addFactor) {
				// add new user
				if (Bench.users.length > 0) {
					const pos = Bench.random(0, Bench.users.length - 1);
					const user = Bench.users[pos];
					Bench.users = Bench.users.filter(u => u !== user);
					Bench.selected.unshift(user);
					this.app.addUser(user);
				}
			} else {
				// increase score
				const pos = Bench.random(0, Bench.selected.length - 1, 2);
				const add = Bench.random(0, 10);
				this.app.putScores(Bench.selected[pos], add);
			}

			this.updateApp(this.app);
		}

		console.timeEnd(this.name || 'Bench');

	}

	init(app) {

	}

	updateApp(app) {

	}
}

class DOMBench extends Bench {
	init(app) {
		this.rootElement = document.getElementById('root');
		this.name = 'DOM Bench';
		this.rootElement.innerHTML = app.toHTML();
	}

	updateApp(app) {
		this.rootElement.innerHTML = app.toHTML();
	}
}

class VDOMBench extends Bench {
	init(app) {
		this.rootElement = document.getElementById('root');
		this.name = 'VDOM Bench';
		this._oldVDOM = app.toVDOM();

		this.rootElement.innerHTML = '';
		VDOM.updateElement(this.rootElement, this._oldVDOM)
	}

	updateApp(app) {
		const newVDOM = app.toVDOM();
		VDOM.updateElement(this.rootElement, newVDOM, this._oldVDOM);
		this._oldVDOM = newVDOM;
	}
}

window.Bench = Bench;

window.bench = new VDOMBench();
bench.bench();

window.bench = new DOMBench();
bench.bench();
