# Proposal

## Why

Стандартный шаблон Next.js содержит избыточные элементы (4 карточки со ссылками на документацию, логотип, декоративные градиенты), которые не нужны для базового фронтенд-приложения open-spec. Упрощение уменьшит размер кодовой базы и уберёт визуальный шум.

## What Changes

- Удаление 4 карточек (Docs, Learn, Templates, Deploy) из главной страницы
- Удаление импорта и отображения логотипа Next.js
- Удаление декоративных градиентов и фоновых эффектов
- Упрощение page.tsx до одной строки: `<h1>Hello World</h1>`
- Упрощение layout.tsx до минимального необходимого

## Capabilities

### New Capabilities
<!-- No new capabilities - this is a visual simplification -->

### Modified Capabilities
<!-- No requirement changes - pure refactoring of UI content -->

## Impact

- Изменяется: `frontend/src/app/page.tsx`
- Изменяется: `frontend/src/app/layout.tsx` (опционально, metadata)
- Удаляются: неиспользуемые SVG-ассеты в `frontend/public/`
