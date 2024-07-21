
# Whisper Frontend

Этот проект представляет собой простой фронтенд на React для основного проекта Whisper API.

## Установка Docker

1. Установите Docker с помощью следующих команд:

   ```sh
   curl -sSL https://get.docker.com | sh
   sudo usermod -aG docker $(whoami)
   ```

2. Перезапустите вашу систему или выйдите из учетной записи и войдите снова, чтобы изменения вступили в силу.

## Сборка Docker-образа

1. Перейдите в корневую директорию проекта.

2. Соберите Docker-образ:

   ```sh
   docker build -t whisper-frontend .
   ```

## Запуск контейнера

1. Запустите Docker-контейнер:

   ```sh
   docker run -p 8081:80 whisper-frontend
   ```

2. Приложение будет доступно по адресу [http://localhost:8081](http://localhost:8081).

