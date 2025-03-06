import { jest, describe, test, expect } from '@jest/globals';
import { ReadyEvent } from '../ReadyEvent.js';

describe('ReadyEvent', () => {
  test('should create ReadyEvent instance', () => {
    const readyEvent = new ReadyEvent();
    expect(readyEvent).toBeInstanceOf(ReadyEvent);
    expect(readyEvent.name).toBe('ready');
    expect(readyEvent.once).toBe(true);
  });

  test('should execute without throwing', async () => {
    const readyEvent = new ReadyEvent();
    const mockClient = {
      user: {
        tag: 'TestBot#1234',
        setPresence: jest.fn()
      }
    };

    // This should not throw an error
    await expect(readyEvent.execute(mockClient)).resolves.not.toThrow();
  });
});
