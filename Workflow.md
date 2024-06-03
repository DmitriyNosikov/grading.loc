# Как работать над проектом

## :golf: Окружение:

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

### :scroll: Сценарии:

В `package.json` предопределено несколько сценариев, как для всего проекта, так и отдельно для Backend и Frontend частей.

### :scroll: Корневые сценарии:

#
#### :arrow_forward: CLI-приложение:
* Список доступных команд
```bash
npm run cli -- --help
```

* Доступ к консоли для генерации n-ого количества моковых данных
```bash
npm run cli -- --generate <n> <postgre-sql-connection-string>
```
:heavy_check_mark: ***Пример:***
```bash
npm run cli -- --generate <n> postgres://admin:admin@localhost:5432/grading-product
```

#
#### :arrow_forward: Скомпилировать Backend:

```bash
npm run build:backend
```
Создаст директорию `dist` и скомпилирует проект.

#### :arrow_forward: Запустить Backend:

```bash
npm run start:backend
```

#
#### :arrow_forward: Скомпилировать Fronetnd:

```bash
npm run build:frontend
```
Создаст директорию `dist` и скомпилирует проект. Если директория существует - она будет вредварительно удалена.

#### :arrow_forward: Запустить Fronetnd:

```bash
npm run start:frontend
```

#
#### :arrow_forward: Скомпилировать проект:

```bash
npm run build
```
Создаст директорию `dist` и скомпилирует проект. Если директория существует - она будет вредварительно удалена.


#
#### :heavy_check_mark: Проверить линтером:

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.


#
### :scroll: Запуск проекта

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#
### :arrow_forward: Backend:
Перед выполнением команд необходимо перейти в директорию `/backend`.

#### :high_brightness: Конфигурация Docker для работы приложения
Педварительно необходимо произвести сборку образов и запуск контейнеров Docker. Для удобства сборки образов и запуска контейнеров подготовлены следующие команды:

* Подготовит и запустит необходимые контейнеры для сервися User
```bash
npm run docker:compose:user
```

* Подготовит и запустит необзодимые контейнеры для сервися Product
```bash
npm run docker:compose:product
```

#### :high_brightness: Prisma (backend database):
Далее необходимо подготовить миграции и сгенерировать Prisma-client. Для этого последовательно выполните следующие команды:
* Подготовка миграции
```bash
npm run pg:migrate
```

* Генерация клиента
```bash
npm run pg:generate
```

* Наполнение тестовыми данными
```bash
npm pg:fill
```


#### :high_brightness: Запуск Backend
* Сборка проекта
```bash
npm run build
```

* Запуск проекта
```bash
npm run start
```

* Запуск проекта в режиме разработки

```bash
npm run start:dev
```

#
#### :page_facing_up: Переменные окружения (backebnd)
Список переменных окружения также доступен в корне backend-проекта (`.env.example`)

##### SERVER
`HOST` 127.0.0.1
`PORT` 8000

##### MONGODB
`MONGODB` grading-user
`MONGODB_HOST` 127.0.0.1
`MONGODB_PORT` 27017
`MONGODB_USER` admin
`MONGODB_PASSWORD` admin
`MONGODB_AUTH_DATABASE` admin
`MONGODB_EXPRESS_PORT` 8081

##### POSTGRES
`POSTGRES_USER` admin
`POSTGRES_PASSWORD` admin
`POSTGRES_DB_NAME` grading-product
`POSTGRES_PORT` 5432

`PGADMIN_DEFAULT_EMAIL` admin@ggrading.loc
`PGADMIN_DEFAULT_PASSWORD` admin
`PGADMIN_DEFAULT_PORT` 8082

##### SMTP
`FAKE_SMTP_SERVER_PORT` 8025
`FAKE_SMTP_UI_PORT` 1085

`SMTP_HOST` 127.0.0.1
`SMTP_PORT` 8025
`SMTP_USER` admin
`SMTP_PASSWORD` smtp-password
`SMTP_FROM` admin@grading.loc

##### JWT
`JWT_ACCESS_TOKEN_SECRET` JGFS(*SG32sg4)
`JWT_ACCESS_TOKEN_EXPIRES_IN` 1h

Примеры переменных окружения также представлены в файле .env.example


## :bookmark_tabs: Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
