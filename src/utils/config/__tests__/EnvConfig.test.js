import { jest, describe, test, expect } from '@jest/globals';
import { EnvConfig } from '../EnvConfig.js';

describe('EnvConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('getRequired throws when variable is not set', () => {
    expect(() => {
      EnvConfig.getRequired('NONEXISTENT_VAR');
    }).toThrow('Required environment variable NONEXISTENT_VAR is not set');
  });

  test('getRequired returns value when variable exists', () => {
    process.env.TEST_VAR = 'test-value';
    expect(EnvConfig.getRequired('TEST_VAR')).toBe('test-value');
  });

  test('get returns default value when variable does not exist', () => {
    expect(EnvConfig.get('NONEXISTENT_VAR', 'default')).toBe('default');
  });

  test('getBotToken returns token when set', () => {
    process.env.DISCORD_BOT_TOKEN = 'test-token';
    expect(EnvConfig.getBotToken()).toBe('test-token');
  });
});