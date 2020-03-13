import useInterval from '../useInterval'
import { renderHook } from '@testing-library/react-hooks';

let callback;

beforeEach(() => {
  callback = jest.fn();
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  callback.mockRestore();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it('should init hook with default delay', () => {
  const { result } = renderHook(() => useInterval(callback));

  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledTimes(1);

});

it('should init hook with custom delay', () => {
  const { result } = renderHook(() => useInterval(callback, 5000));

  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledTimes(2);
});

it('should init hook without delay', () => {
  const { result } = renderHook(() => useInterval(callback, null));

  expect(result.current).toBeUndefined();
});