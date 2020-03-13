import { usePrevious } from '../usePrevious'
import { renderHook, act } from '@testing-library/react-hooks';

it('should init useGameStatus', () => {
  let init = 0
  const { result, rerender } = renderHook(() => usePrevious(init));

  init = 10
  rerender()
  expect(result.current).toBe(0);
});
