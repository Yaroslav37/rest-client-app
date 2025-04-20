import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InputItem } from '@/components/ui/InputItem/InputItem';

describe('InputItem', () => {
  const mockOnRemove = vi.fn();
  const mockOnUpdate = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  const setup = () =>
    render(
      <InputItem
        index={0}
        keyValue="testKey"
        value="testValue"
        onRemove={mockOnRemove}
        onUpdate={mockOnUpdate}
      />,
    );

  it('renders inputs with initial values', () => {
    setup();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('testKey');
    expect(inputs[1]).toHaveValue('testValue');
  });

  it('calls onRemove when delete button is clicked', () => {
    setup();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('calls onUpdate with debounced values when inputs change', async () => {
    setup();
    const inputs = screen.getAllByRole('textbox');

    act(() => {
      fireEvent.change(inputs[0], { target: { value: 'updatedKey' } });
      fireEvent.change(inputs[1], { target: { value: 'updatedValue' } });
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(mockOnUpdate).toHaveBeenCalledWith(0, 'updatedKey', 'updatedValue');
  });

  it('does not call onUpdate if values do not change', () => {
    setup();
    vi.advanceTimersByTime(500);
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
