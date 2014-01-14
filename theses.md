# 1 Архитектура

## 1.1 Знакомство, инструменты, настройка окружения

* [Git](http://git-scm.com) и GitHub.
* [NodeJS](http://nodejs.org) и [NPM](https://npmjs.org).
* Репозиторий проекта.
* Создаем `package.json`.
* [Grunt](http://gruntjs.com).
* Шаблонизатор [Fest](https://github.com/mailru/fest).

Ссылки:

1. Scott Chacon. [Pro Git](http://git-scm.com/book) // 2009.
2. [Grunt: Getting started](http://gruntjs.com/getting-started) // 2013.

ДЗ:

1. Склонировать скелет проекта, установить npm зависимости.
2. Создать прототип приложения.
3. Организовать сборку ресурсов CSS, JS, XML.

## 1.2 Архитектура веб-приложений

Модули, БЭМ, Backbone. Роутинг

Литература:

1. Addy Osmani. [Patterns For Large-Scale JavaScript Application Architecture](http://addyosmani.com/largescalejavascript/) // 2011.
2. Addy Osmani. [Developing Backbone.js Applications](http://addyosmani.github.io/backbone-fundamentals/) // 2013.

ДЗ:

1. Реализовать проект на Backbone (определить models/collections и views).
2. Организовать подключение ресурсов через AMD.
3. Организовать сборку ресурсов для production и development окружения.

# 2 DOM & AJAX

## 2.1 Работа с DOM, Events

DOM, Events, Host Objects, PubSub

ДЗ:

1. Реализовать взаимодействие между модулями приложения через pubSub.
2. Реализация игровой механики (на протяжении последующих домашних заданий в этом модуле).

## 2.2 Сетевое взаимодествие

HTTP, AJAX, Websockets

Литература:

1. Tiffany Brown. [Introduction to XMLHttpRequest Level 2](http://dev.opera.com/articles/view/xhr2/) // 2012.
2. Armin Ronacher. [Websockets 101](http://lucumr.pocoo.org/2012/9/24/websockets-101/) // 2012.

ДЗ:

1. Наладить взаимодествие с сервером с помощью AJAX.

## 2.3 Хранение данных на клиенте

Cookie, local storage, indexDB

ДЗ:

1. Организовать хранение пользовательских настроек на клиенте.
2. Сохранять результаты игры на клиенте, при остуствии связи с сервером.

# 3 Отладка и мобильный веб

## 3.1 Web Inspector и препроцессоры CSS

Sass, SourceMap

ДЗ:

1. Перевести CSS на Sass.

## 3.2 Производительность

HTTP (waterfall, cache), reflow, repaint, Web workers, App Cache, prefecth

ДЗ:

1. Сделать прогресс-бар загрузки ресурсов.
2. Настроить HTTP заголовки, отвечающие за кеширование ресурсов.

## 3.3 Возможности смартфонов

Акселерометр, гироскоп, тач-события

Литература:

1. Chris Wilson, Paul Kinlan. [Touch And Mouse. Together Again For The First Time](http://www.html5rocks.com/en/mobile/touchandmouse/) // 2013.

ДЗ:

1. Сделать джойстик для смартфонов и организовать взаимодействие на websockets между экранами приложения.

# Полезные ссылки

1. [Build New Games. Open Web techniques for cutting-edge game development](http://buildnewgames.com).
