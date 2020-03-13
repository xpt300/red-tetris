import { usePlayer } from '../usePlayer'
import { renderHook, act } from '@testing-library/react-hooks';

it('should init usePlayer', () => {
  const { result } = renderHook(() => usePlayer());

  console.log(result.current[0], '------');
  // expect(result.current[0]).toBe(0);
  // expect(result.current[4]).toBe(0);

  act(() => {
    result.current[2]([])
  })
  // expect(result.current[4]).toBe(1);
});

// it('should useGameStatus with 40 score', () => {
//   const { result } = renderHook(() => useGameStatus(1));

//   expect(result.current[0]).toBe(40);
// });