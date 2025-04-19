import { describe, it, expect } from 'vitest';
import { replaceVariables } from '@/shared/utils/replace-variables';

describe('replaceVariables', () => {
  it('replaces a single variable', () => {
    const result = replaceVariables('Hello, {{name}}!', { name: 'Alice' });
    expect(result).toBe('Hello, Alice!');
  });

  it('replaces multiple variables', () => {
    const result = replaceVariables('User: {{user}}, Role: {{role}}', {
      user: 'John',
      role: 'admin',
    });
    expect(result).toBe('User: John, Role: admin');
  });

  it('leaves unmatched variables empty', () => {
    const result = replaceVariables('Hello, {{name}} and {{surname}}!', { name: 'Bob' });
    expect(result).toBe('Hello, Bob and !');
  });

  it('replaces repeated variables', () => {
    const result = replaceVariables('{{word}} {{word}}', { word: 'echo' });
    expect(result).toBe('echo echo');
  });

  it('returns original string if no variables found', () => {
    const result = replaceVariables('No variables here!', { name: 'ignored' });
    expect(result).toBe('No variables here!');
  });

  it('handles empty string input', () => {
    const result = replaceVariables('', { any: 'value' });
    expect(result).toBe('');
  });

  it('returns empty for variable with empty string value', () => {
    const result = replaceVariables('Hello, {{name}}!', { name: '' });
    expect(result).toBe('Hello, !');
  });

  it('handles undefined variables argument', () => {
    const result = replaceVariables('Hello, {{name}}!');
    expect(result).toBe('Hello, !');
  });
});
