---
layout: default
title: Отладка и мобильный веб
---

{::options auto_ids="false" /}

[ГЛАВНАЯ](/)

# 3 Отладка и мобильный веб
{: id="3"}

**ВНИМАНИЕ! РАЗДЕЛ НАХОДИТСЯ В СТАДИИ РАЗРАБОТКИ.**

Содержание:

3.1. [Web Inspector и препроцессоры CSS](#3.1)

3.1.1 [Полезные ресурсы](#3.1.1)\\
3.1.2 [Смешанное занятие](#3.1.2)\\
3.1.3 [Домашнее задание](#3.1.3)\\
3.1.4 [Техническое задание](#3.1.4)
{:.toc}

3.2. [Производительность](#3.2)

3.2.1 [Полезные ресурсы](#3.2.1)\\
3.2.2 [Смешанное занятие](#3.2.2)\\
3.2.3 [Домашнее задание](#3.2.3)\\
3.2.4 [Техническое задание](#3.2.4)
{:.toc}

3.3 [Возможности смартфонов](#3.3)

3.3.1 [Полезные ресурсы](#3.3.1)\\
3.3.2 [Смешанное занятие](#3.3.2)\\
3.3.3 [Домашнее задание](#3.3.3)\\
3.3.4 [Техническое задание](#3.3.4)
{:.toc}

## 3.1 Web Inspector и препроцессоры CSS
{: id="3.1"}

### 3.1.1 Полезные ресурсы
{: id="3.1.1"}

1. [Chrome DevTools](https://developers.google.com/chrome-developer-tools/).
2. [Sass](http://sass-lang.com).
2. [Source Maps](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors).

### 3.1.2 Смешанное занятие
{: id="3.1.2"}

<!--
- WebInspector (demo).
    + breakpoints
    + source maps
    + overrides
- Sass
    + mixins
-->

### 3.1.3 Домашнее задание
{: id="3.1.3"}

1. Перевести CSS на Sass. Используйте `grunt-contrib-sass` для сборки проекта.
2. Настроить `grunt-contrib-watch` для SCSS файлов.
3. Рефакторинг SCSS файлов (переменные, mixin, nesting).

## 3.2 Производительность
{: id="3.2"}

### 3.2.1 Полезные ресурсы
{: id="3.2.1"}

1. Tali Garsiel, Paul Irish. [Принципы работы современных веб-браузеров](http://www.html5rocks.com/ru/tutorials/internals/howbrowserswork/).
2. Yahoo Developer Network. [Best Practices for Speeding Up Your Web Site](http://developer.yahoo.com/performance/rules.html).
3. Егор Дыдыкин. [Новая Главная портала Mail.Ru](http://habrahabr.ru/company/mailru/blog/142193/).

### 3.2.2 Смешанное занятие
{: id="3.2.2"}

### 3.2.3 Домашнее задание
{: id="3.2.3"}

1. Реализовать индикатор загрузки приложения.
2. Организовать сборку ресурсов для `production` и `development` окружений.

### 3.2.4 Техническое задание
{: id="3.2.4"}

1. В Gruntfile необходимо реализовать задачу `build`. Эта задача должна выполнять:
    1. Собирать CSS в режиме `compressed`.
    2. Собирать JavaScript с помощью  [`grunt-contrib-requirejs`](https://npmjs.org/package/grunt-contrib-requirejs).
    3. Минифицировать сборку JavaScript файла вместе с библиотекой [`almond`](https://github.com/jrburke/almond) с помощью [`grunt-contrib-concat`](https://npmjs.org/package/grunt-contrib-concat) и [`grunt-contrib-uglify`](https://npmjs.org/package/grunt-contrib-uglify).
2. Собранные задачей `build` файлы должны подключаться на странице игры при условии запуска сервера в `production` окружении.

## 3.3 Возможности смартфонов
{: id="3.3"}

### 3.3.1 Полезные ресурсы
{: id="3.3.1"}

1. Chris Wilson, Paul Kinlan. [Touch And Mouse. Together Again For The First Time](http://www.html5rocks.com/en/mobile/touchandmouse/) // 2013.
2. Earle Castledine, Myles Eftos, Max Wheeler. [Build Mobile Websites and Apps for Smart Devices](http://www.sitepoint.com/store/build-mobile-websites-and-apps-for-smart-devices/) // 2011.
3. Mark Pilgrim. [Dive into HTML5](http://diveintohtml5.info/).
4. [Apple Developer](https://developer.apple.com/)
5. [Mozilla Developer Network](https://developer.mozilla.org/ru/)
6. [HTML5 Rocks](http://www.html5rocks.com/en/)
7. [HTML5 Please](http://html5please.com/)
8. [Can I use...](http://caniuse.com/)

### 3.3.2 Смешанное занятие
{: id="3.3.2"}

<!--
- Акселерометр.
- Гироскоп.
- Тач-события.
-->

### 3.3.3 Домашнее задание
{: id="3.3.3"}

1. Сделать джойстик для смартфонов и организовать взаимодействие на websockets между экранами приложения.

### 3.3.4 Техническое задание
{: id="3.3.4"}

### 3.3.5 RPC API
{: id="3.3.5"}

Создаем экземпляр Connector с указанием remote: '/<тип клиента: console|player>'.

~~~
var server = new Connector({
    remote: '/console'
});
~~~

Через socket.io устанавливается соединение с сервером по пути, указанному в remote, и происходит запрос на получение набора функций, поддерживаемых сервером. Запрос асинхронный, потому Connector предоставляет метод onReady, позволяющий начать работу с сервером, когда все будет готово.

~~~
server.onReady(function(){
    server.someServerSideFunction();
});
~~~

При желании можно часть или все функции объявить при инициализации и вызывать их сразу. Запросы на вызов серверной функции складываются в очередь и будут запущены после полчения списка серверных функций.

~~~
var server = new Connector({
    server: ['getToken', 'bind'],
    remote: '/console'
});

server.getToken(function(token){});
~~~

На сервере реализованы следующие функции:

~~~
server.getToken(function(token){
    token // токен для иниализации связи
});

// для первичной инициализации связки по токену
server.bind({token: '<token>'}, function(data){
    data.status // 'success' в случае успеха, 'undefined token' в случае ошибки, 'busy token' в случае, если токен занят
    data.guid // guid связки в случае успеха
});

// для восстановления связки, когда guid уже получен
server.bind({guid: '<guid>'}, function(data){
    data.status // 'success' в случае успеха, 'undefined guid' в случае ошибки
});
~~~

Так же Connector поддерживает следующие события

~~~
server.on('connect', function(){}); // установка соединения
server.on('disconnect', function(){}); // потеря соединения
server.on('reconnect', function(){}); // восстановление соединения
~~~

Специальное событие для консоли, происходящее когда игрок подключил джойстик

~~~
server.on('player-joined', function(data){
    data.guid // guid инициализированной связки
});
~~~

Для общения между консолью и джойстиком используется метод send для отправки сообщения от одного клиента и событие message на другом для получения сообщения.

~~~
server.send(data, function(answer){
    answer // ответ другой стороны
});

server.on('message', function(data, answer){
    data // данные сообщения
    answer('<answer>') // отправка ответа обратно
});
~~~

