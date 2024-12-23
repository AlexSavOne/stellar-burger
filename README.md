# 🍔 Проектная работа «Stellar Burger»

## 📝 Описание

Проект **"Stellar Burger"** представляет собой онлайн-магазин бургеров, где можно собрать собственный бургер из разнообразных ингредиентов. В процессе работы над этим проектом была реализована адаптивная веб-страница с маршрутизацией, глобальным состоянием и поддержкой авторизации для пользователей. Это приложение поддерживает функционал создания заказов, истории заказов, а также управления ингредиентами.

## 🎯 Цели проекта

- 🚀 Реализация системы маршрутизации с использованием **react-router-dom**.
- 🌐 Подключение глобального состояния с помощью **Redux** для работы с данными приложения.
- 🔒 Разработка интерфейса для авторизации и защиты личного кабинета пользователя.
- 🕒 Создание страницы истории заказов с обновлением в режиме реального времени.
- ✅ Добавление тестов с использованием **Jest** и **Cypress** для проверки ключевых функций приложения.

## 🌟 Особенности проекта

- **🗂 Управление состоянием через Redux**: глобальное состояние подключено ко всем страницам для оптимального взаимодействия с данными.
- **🔐 Авторизация и защита данных пользователя**: доступ к истории заказов и редактированию данных профиля возможен только для авторизованных пользователей.
- **🔄 Реалтайм-обновления**: лента заказов и история заказов автоматически обновляются в режиме реального времени.
- **🛡️ Маршрутизация с защитой личных данных**: приложение поддерживает защищённые маршруты и удобную навигацию по профилю и истории заказов.
- **🧪 Тестирование**: ключевые функции и компоненты приложения покрыты тестами с использованием **Jest** и **Cypress**.

## 📂 Файловая структура

- **`/src/components`**: компоненты пользовательского интерфейса, включая общие и специализированные элементы.
- **`/src/services`**: Redux-хранилище и файлы для управления глобальным состоянием.
- **`/src/pages`**: страницы приложения, такие как Лента заказов, История заказов и Профиль.
- **`/src/utils`**: вспомогательные функции и константы для работы с API и управления состоянием.
- **`/src/tests`**: файлы для юнит- и интеграционного тестирования.

## 🛠️ Технологии

- **⚛️ React**: разработка интерфейса и взаимодействие с компонентами.
- **📚 TypeScript**: типизация для улучшения читаемости и надёжности кода.
- **📦 Redux**: управление глобальным состоянием для работы с заказами и профилем пользователя.
- **🧪 Jest**: тестирование функциональности компонентов и редьюсеров.
- **🔎 Cypress**: интеграционное тестирование и проверка пользовательского опыта.
- **🛠️ Webpack**: сборка и оптимизация кода.
- **🔗 Git**: контроль версий и управление изменениями.
- **📦 npm**: менеджер пакетов для установки и управления зависимостями.


### 💻 Как запустить

1. Клонируйте репозиторий:
   ```bash
   git clone git@github.com:AlexSavOne/stellar-burger.git
   ```
2. Перейдите в директорию проекта:
   ```bash
    cd stellar-burger
   ```
3. Установите зависимости:
   ```bash
    npm install
   ```
4. Запустите проект в режиме разработки:
   ```bash
    npm start
   ```
5. Откройте приложение в браузере по адресу:
   ```bash
    http://localhost:3000
   ```
