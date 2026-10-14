// jest.config.ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Путь к корню Next.js-приложения, чтобы next/jest подхватил next.config.js и .env
  dir: './',
});

const config: Config = {
  // Среда для тестирования DOM — обязательна для RTL
  testEnvironment: 'jsdom',

  // Файл с глобальными настройками
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],

  // Откуда импортировать модули (например, для '@/api')
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // Маппинг алиасов путей (дублирует paths из tsconfig.json)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Где искать тестовые файлы
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Игнорировать при тестировании
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

export default createJestConfig(config);