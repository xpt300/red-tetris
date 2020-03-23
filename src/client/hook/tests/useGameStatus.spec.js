import { useGameStatus } from '../useGameStatus'
import { renderHook, act } from '@testing-library/react-hooks';

it('should init useGameStatus', () => {
  const { result } = renderHook(() => useGameStatus(0));

  expect(result.current[0]).toBe(0);
  expect(result.current[4]).toBe(0);

  act(() => {
    result.current[5](1)
  })
  expect(result.current[4]).toBe(1);
});