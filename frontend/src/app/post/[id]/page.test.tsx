// components/FetchButton.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FetchButton from './page';
import { getPost } from '@/api';

// === 1. Мокаем next/navigation ===
// useParams и useRouter нельзя вызвать в тесте вне контекста Next.js,
// поэтому подменяем их на jest.fn() с нужным возвратом.
const mockBack = jest.fn();

const mockAlert = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '42' }), // фиксированный id для теста
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
    replace: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// === 2. Мокаем модуль @/api ===
jest.mock('@/api', () => ({
  getPost: jest.fn(),
}));

// Приводим getPost к типу jest.Mock, чтобы TS не ругался на mockResolvedValue
const mockedGetPost = jest.mocked(getPost);

// === 3. Общие настройки перед каждым тестом ===
beforeEach(() => {
  jest.clearAllMocks();
  // Мокаем window.alert, чтобы реальный диалог не открывался в jsdom
  jest.spyOn(window, 'alert').mockImplementation(mockAlert);
  render(<FetchButton />);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('FetchButton', () => {
  test('Есть заголовок h1 ',()=>{
    // render(<FetchButton/>)

    expect(screen.getByText('Hello!')).toBeInTheDocument();
  })

  test('кнопка алер Существует',()=>{
    expect(screen.getByRole('button',{name:'Alert'})).toBeInTheDocument()
  })

  test('кнопка алер по нажатию вызывает alert', async ()=>{
    const user = userEvent.setup()

    await user.click(screen.getByRole('button',{name:'Alert'}));
    expect(mockAlert).toHaveBeenCalledTimes(1)
    expect(mockAlert).toHaveBeenCalledWith('Hello')
  })

  test('рендерит обе кнопки в начальном состоянии', () => {
    // render(<FetchButton />);

    expect(screen.getByRole('button', { name: 'Получить пост' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'back' })).toBeInTheDocument();
    // Кнопка получения поста не заблокирована
    expect(screen.getByRole('button', { name: 'Получить пост' })).toBeEnabled();
    // Данных ещё нет
    expect(screen.queryByText(/"title"/)).not.toBeInTheDocument();
  });

  test('вызывает getPost с корректным id и показывает данные', async () => {
    const user = userEvent.setup();
    const fakePost = { id: 42, title: 'Hello', body: 'World' };

    mockedGetPost.mockResolvedValueOnce(fakePost);

    // render(<FetchButton />);

    await user.click(screen.getByRole('button', { name: 'Получить пост' }));

    // Проверяем, что getPost вызван именно с id из useParams
    expect(mockedGetPost).toHaveBeenCalledTimes(1);
    expect(mockedGetPost).toHaveBeenCalledWith('42');

    // Ждём появления данных в DOM (JSON.stringify с отступами)
    expect(await screen.findByText(/"title": "Hello"/)).toBeInTheDocument();
    expect(screen.getByText(/"id": 42/)).toBeInTheDocument();
  });

  test('показывает "Загрузка..." и блокирует кнопку во время запроса', async () => {
    const user = userEvent.setup();

    // Создаём "зависший" промис, чтобы поймать промежуточное состояние
    let resolvePromise: (value: unknown) => void = () => {};
    mockedGetPost.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }) as ReturnType<typeof getPost>
    );

    // render(<FetchButton />);
    await user.click(screen.getByRole('button', { name: 'Получить пост' }));

    // Проверяем промежуточное состояние
    const loadingButton = screen.getByRole('button', { name: 'Загрузка...' });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();

    // Завершаем промис, чтобы не было act()-предупреждений
    resolvePromise({ ok: true });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Получить пост' })).toBeEnabled()
    );
  });

  test('логирует ошибку, если запрос упал', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Network fail');

    mockedGetPost.mockRejectedValueOnce(error);

    // render(<FetchButton />);
    await user.click(screen.getByRole('button', { name: 'Получить пост' }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    // Кнопка снова активна, но данных нет
    expect(screen.getByRole('button', { name: 'Получить пост' })).toBeEnabled();
    expect(screen.queryByText(/"title"/)).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  test('кнопка "back" вызывает router.back()', async () => {
    const user = userEvent.setup();

    // render(<FetchButton />);
    await user.click(screen.getByRole('button', { name: 'back' }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});