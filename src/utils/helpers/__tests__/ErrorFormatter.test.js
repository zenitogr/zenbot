import { ErrorFormatter } from '../ErrorFormatter.js';

describe('ErrorFormatter', () => {
  test('formats string error', () => {
    const error = 'Test error';
    const formatted = ErrorFormatter.format(error);
    expect(formatted).toBe('Test error');
  });

  test('formats Error object', () => {
    const error = new Error('Test error');
    const formatted = ErrorFormatter.format(error);
    expect(formatted).toContain('Error: Test error');
    expect(formatted).toContain('Stack:');
  });

  test('handles undefined error', () => {
    const formatted = ErrorFormatter.format(undefined);
    expect(formatted).toBe('Unknown error');
  });
});