import { renderHook, act } from '@testing-library/react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { vi } from 'vitest';

describe('useScrollTrigger', () => {
  beforeEach(() => {
    window.scrollY = 0;
    vi.clearAllMocks();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useScrollTrigger());
    expect(result.current).toBe(false);
  });

  it('should return true when scrolled past 50px', () => {
    const { result } = renderHook(() => useScrollTrigger());

    act(() => {
      window.scrollY = 51;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when scrolled exactly 50px', () => {
    const { result } = renderHook(() => useScrollTrigger());

    act(() => {
      window.scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('should return false when scrolled back up', () => {
    const { result } = renderHook(() => useScrollTrigger());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.scrollY = 10;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);
  });

  it('should clean up event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollTrigger());

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle rapid scroll events', () => {
    const { result } = renderHook(() => useScrollTrigger());

    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('should work with multiple hooks simultaneously', () => {
    const { result: result1 } = renderHook(() => useScrollTrigger());
    const { result: result2 } = renderHook(() => useScrollTrigger());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);
  });
});
