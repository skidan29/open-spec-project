# Design

## Context

Проект open-spec инициализировал frontend-приложение в директории `frontend/` с использованием React + Next.js + TypeScript. Приложение уже создано через `create-next-app` и готово к работе.

См. proposal.md для мотивации и specs/frontend-app/spec.md для требований.

## Goals / Non-Goals

**Goals:**
- Документировать текущую архитектуру frontend-приложения
- Описать структуру файлов и директорий
- Зафиксировать используемые технологии и их версии

**Non-Goals:**
- Не является планом разработки нового функционала
- Не описывает backend-интеграцию (если потребуется в будущем)

## Decisions

### Стек технологий

| Технология | Версия | Обоснование |
|------------|--------|-------------|
| Next.js | 14.2.15 | App Router, Server Components, автоматическая оптимизация |
| React | 18.3.1 | Последняя стабильная версия с Concurrent Features |
| TypeScript | ^5 | Полная поддержка strict mode, улучшенный DX |
| ESLint | ^8 | Интеграция с Next.js через eslint-config-next |

### Структура проекта

```
frontend/
├── public/          # Статические файлы (SVG иконки)
├── src/app/         # App Router (layout.tsx, page.tsx, globals.css)
├── package.json     # Зависимости и скрипты
├── tsconfig.json    # Конфигурация TypeScript
├── next.config.js   # Конфигурация Next.js
└── .eslintrc.json   # ESLint правила
```

### Архитектура App Router

- `src/app/layout.tsx` — корневой layout с metadata API
- `src/app/page.tsx` — главная страница (Server Component по умолчанию)
- `src/app/globals.css` — глобальные стили

## Risks / Trade-offs

[Риск] Не описаны конкретные страницы и функциональность — **Митигация**: Этот change фиксирует только текущую инициализацию; развитие приложения будет описано в отдельных changes по мере необходимости.
