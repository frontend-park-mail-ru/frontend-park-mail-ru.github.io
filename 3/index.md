---
layout: default
title: Отладка и мобильный веб
---

{::options auto_ids="false" /}

← [Домой](/)

# 3 Отладка и мобильный веб
{:#3}

**ВНИМАНИЕ! РАЗДЕЛ НАХОДИТСЯ В СТАДИИ РАЗРАБОТКИ.**

Содержание:

1. [Web Inspector и препроцессоры CSS](#3-1)
    * [Полезные ресурсы](#3-1-links)
    * [Лекция](#3-1-lecture)
    * [Практика](#3-1-practice)
    * [Домашнее задание](#3-1-hw)
    * [Техническое задание](#3-1-spec)
2. [Производительность](#3-2)
    * [Полезные ресурсы](#3-2-links)
    * [Лекция](#3-2-lecture)
    * [Практика](#3-2-practice)
    * [Домашнее задание](#3-2-hw)
    * [Техническое задание](#3-2-spec)
3. [Возможности смартфонов](#3-3)
    * [Полезные ресурсы](#3-3-links)
    * [Лекция](#3-3-lecture)
    * [Практика](#3-3-practice)
    * [Домашнее задание](#3-3-hw)
    * [Техническое задание](#3-3-spec)

## 3.1 Web Inspector и препроцессоры CSS
{:#3-1}

#### Полезные ресурсы
{:#3-1-links}

1. [Sass](http://sass-lang.com).
2. [Source Maps](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors).

### Лекция
{:#3-1-lecture}

### Практика
{:#3-1-practice}

### Домашнее задание
{:#3-1-hw}

1. Перевести CSS на Sass.

## 3.2 Производительность
{:#3-2}

### Полезные ресурсы
{:#3-2-links}

1. Yahoo Developer Network. [Best Practices for Speeding Up Your Web Site](http://developer.yahoo.com/performance/rules.html).

### Лекция
{:#3-2-lecture}

<!--
- HTTP Cache.
- HTTP Waterfall.
- Reflow/Repaint.
- Web workers.
- [App Cache](http://www.html5rocks.com/en/tutorials/appcache/beginner/).
- Prefetching.
- CSS специфичность.
-->

### Практика
{:#3-2-practice}

### Домашнее задание
{:#3-2-hw}

1. Сделать прогресс-бар загрузки ресурсов.
2. Настроить HTTP заголовки, отвечающие за кеширование ресурсов.
3. Организовать сборку ресурсов для production и development окружений.

### Техническое задание
{:#3-2-spec}

1. Структура файлов (production):
~~~
production/
    js/
        libs.js
        main.js
    css/
        main.css
~~~
2. CSS проекта собирается с флагом  `style: 'compressed'` в файл `production/css/main.css`
3. Сборка main.js осуществляется с помощью [`grunt-contrib-requirejs`](https://npmjs.org/package/grunt-contrib-requirejs)).
4. Минификация файла осуществялется с помощью [`grunt-contrib-uglify`](https://npmjs.org/package/grunt-contrib-uglify).
5. В продакшене для реализации AMD используется [`almond`](https://github.com/jrburke/almond).
6. Запуск production `$ NODE_ENV=production node app.js`
7. Определение в `node.js` текущей версии `process.env.NODE_ENV == 'production'`
~~~
if( process.env.NODE_ENV == 'production' ){
    app.use(express.static(path.join(__dirname, 'production')));
}else{
    app.use(express.static(path.join(__dirname, 'public')));
}
~~~

## 3.3 Возможности смартфонов
{:#3-3}

#### Полезные ресурсы
{:#3-3-links}

1. Chris Wilson, Paul Kinlan. [Touch And Mouse. Together Again For The First Time](http://www.html5rocks.com/en/mobile/touchandmouse/) // 2013.

### Лекция
{:#3-3-lecture}

<!--
- Акселерометр.
- Гироскоп.
- Тач-события.
-->

### Практика
{:#3-3-practice}

### Домашнее задание
{:#3-3-hw}

1. Сделать джойстик для смартфонов и организовать взаимодействие на websockets между экранами приложения.

### Техническое задание
{:#3-3-spec}

### RPC API
{:#3-3-rpc}

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


