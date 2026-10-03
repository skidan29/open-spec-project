# Design

## Context

Простое упрощение UI компонента. Реализация заключается в замене содержимого `page.tsx`.

## Goals / Non-Goals

**Goals:**
- Минимальный working frontend с текстом "Hello World"

**Non-Goals:**
- Сохранение документации Next.js
- Сохранение стилизации или градиентов
- Модификация layout.tsx (metadata можно оставить)

## Decisions

1. **Оставить layout.tsx как есть** — базовый layout с `children` не требует изменений для этой задачи

## Risks / Trade-offs

- Минимальный риск — прямое изменение одного файла
