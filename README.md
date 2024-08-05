# adonisjs-todolist

## Running server app

- Create .env file and copy everything from .env.example file on level of server's derectory.
- Open terminal and move to server dir (cd server/)
- run next commands, docker-compose will create PosgreSQL container

```bash
$ npm ci
$ docker-compose up -d
```

- then need to run migrations and run server

```bash
$ node ace migration:run
$ npm run dev
```

## Running client app

- Open terminal and move to client dir (cd client/) and run commands

```bash
$ npm ci
$ npm run dev
```

### Stack

- Backend
  - Adonisjs
  - Lucid
  - PostgreSQL
- Frontend
  - React
  - Tailwind
  - axios

### To create new Todo pls always provide title as it's required property, another props like description and file are optional (validation only on backend part, on front part just throwing logs)

- File input accepts only files with image/\* format => to download particular todo's file just click on file name
