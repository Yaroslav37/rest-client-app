import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: vi.fn().mockReturnValue({
    variable: '--font-inter',
    className: 'font-inter',
    style: { fontFamily: 'Inter' },
  }),
  Montserrat: vi.fn().mockReturnValue({
    variable: '--font-montserrat',
    className: 'font-montserrat',
    style: { fontFamily: 'Montserrat' },
  }),
  Open_Sans: vi.fn().mockReturnValue({
    variable: '--font-open-sans',
    className: 'font-open-sans',
    style: { fontFamily: 'Open Sans' },
  }),
}));

import { inter, montserrat, openSans } from '@/utils/fonts';

describe('Font Loaders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should configure Inter font correctly', () => {
    expect(inter).toEqual({
      variable: '--font-inter',
      className: 'font-inter',
      style: { fontFamily: 'Inter' },
    });
  });

  it('should configure Montserrat font correctly', () => {
    expect(montserrat).toEqual({
      variable: '--font-montserrat',
      className: 'font-montserrat',
      style: { fontFamily: 'Montserrat' },
    });
  });

  it('should configure Open Sans font correctly', () => {
    expect(openSans).toEqual({
      variable: '--font-open-sans',
      className: 'font-open-sans',
      style: { fontFamily: 'Open Sans' },
    });
  });
});
