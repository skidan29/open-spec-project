# Frontend

React + TypeScript + Next.js приложение.

## Технологии

- **Next.js 14** — React-фреймворк для production
- **TypeScript** — Типизация
- **ESLint** — Линтинг кода

## Запуск

```bash
# Установка зависимостей
npm install

# Режим разработки
npm run dev

# Production сборка
npm run build

# Production сервер
npm run start
```

## Структура проекта

```
frontend/
├── src/
│   └── app/           # App Router страницы
│       ├── layout.tsx # Корневой layout
│       ├── page.tsx   # Главная страница
│       └── globals.css
├── public/            # Статические файлы
├── package.json
├── tsconfig.json
└── next.config.js
```
