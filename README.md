# ��������� Client Server Application
��� ��������� �볺��-���������� ������� ���� �����������:
* �볺�� - HTML, CSS, JS
* ������ - NodeJS
* �� - Redis

## ����������� NPM ������
[Redis](https://www.npmjs.com/package/redis)

## ����������
1) �������� ������ �� Redis �������� redis-server.exe
2) ��� ��������� redis-cli.exe � ������ ������� PING � ���� ������� ������� PONG, ������� Redis ������� �� ������
2) ��� ������� ������� NodeJS ��������������� ������� 
```sh
	node app.js
```
4) ����� ������ NodeJS ����������, � ������� ������ �������� ���������: 
```sh
	Server listens on http://127.0.0.1:7000
	Connected to Redis
	Redis connected successfully
```
3) ³�������� � ������� ���� ������� index.html
4) ���, �� ��� ������ ��������� � ����� ��������, ������� IP, ��� ������������� �� ������ NodeJS � � ������� ���������� � �� Redis.
5)  ���� �� ��������� ������ � �������� NodeJS, �� ��������� �������� �������:
```sh
	ctrl + C
```
6)ϳ��� ������� ������� NodeJS, ������ �� ������� �������� �������������:
```sh
	Shutting down server...
	Redis connection closed
```
7) ���� �� ��������� ������ � �� Redis, ���������� ����� redis-server.exe � redis-cli.exe. 