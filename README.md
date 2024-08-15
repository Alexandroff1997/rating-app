<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Описание

Приложение представляет из себя API платформы системы рейтингов каких-либо ресурсов. Написано с помощью NestJS + MongoDB.

## Установка приложения

- Node 18+
- Необходимо создать файл .env и скопировать в него данные из файлы .env.EXAMPLE
- Выполнить команды

```bash
$ npm install
```

## Запуск приложения

- Выполнить команды

```bash
$ docker compose up -d

$ npm run start:dev
```

## Запуск приложения в docker контейнерах

- В файле .env нужно изменить MONGO_URI на MONGO_URI=mongodb://mongodb:27017/mongo

- В файле docker-compose.yml нужно раскомментировать строчки, где прописан сервис приложения

- Выполнить команды

```bash
$ docker build -t rating-api .

$ docker compose up -d
```

## Тесты

- Выполнить команды

```bash
# e2e tests
$ npm run test:e2e
```

## Приложение

- Открыть папку postman
- Импортировать коллекцию
- Зарегистрировать пользователя
- Выполнить авторизацию
