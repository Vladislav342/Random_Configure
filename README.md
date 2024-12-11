# Створення Client Server Application
Для створення клієнт-серверного додатка було використано:
* Клієнт - HTML, CSS, JS
* Сервер - NodeJS
* БД - Redis

## Встаневленні NPM пакети
[Redis](https://www.npmjs.com/package/redis)

## Інструкція
1) Запустіть сервер бд Redis відкривши redis-server.exe
2) Далі відкриваємо redis-cli.exe і пишемо команду PING і якщо відповідь надійшла PONG, значить Redis готовий до роботи
2) Для запуску сервера NodeJS використовується команда 
```sh
	node app.js
```
4) Когда сервер NodeJS запустится, в консоли должен показать сообщение: 
```sh
	Server listens on http://127.0.0.1:7000
	Connected to Redis
	Redis connected successfully
```
3) Відкриваємо в браузері нашу сторінку index.html
4) Далі, ми вже можемо працювати з даним додатком, вводячи IP, яке відправляється на сервер NodeJS і з сервера записується в бд Redis.
5)  Коли ми завершили роботу з сервером NodeJS, то натискаємо клавішами команду:
```sh
	ctrl + C
```
6)Після зупинки сервера NodeJS, сервер ще повинен відповісти повідомленнями:
```sh
	Shutting down server...
	Redis connection closed
```
7) Потім ми завершуємо роботу з бд Redis, закриваючи файли redis-server.exe і redis-cli.exe. 