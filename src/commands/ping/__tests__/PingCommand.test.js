import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { PingCommand } from '../PingCommand.js';
import { EmbedBuilder } from 'discord.js';

describe('PingCommand', () => {
  let command;
  let mockMessage;
  let mockSentMessage;

  beforeEach(() => {
    jest.useFakeTimers();
    command = new PingCommand();
    
    mockSentMessage = {
      createdTimestamp: 1000,
      edit: jest.fn().mockResolvedValue({}),
    };

    mockMessage = {
      createdTimestamp: 900,
      reply: jest.fn().mockResolvedValue(mockSentMessage),
      client: {
        ws: {
          ping: 50
        }
      }
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should handle valid WebSocket ping', async () => {
    const ping = await command.getWebSocketPing(mockMessage.client);
    expect(ping).toBe('50ms');
  });

  test('should handle invalid WebSocket ping and retry', async () => {
    mockMessage.client.ws.ping = -1;
    const pingPromise = command.getWebSocketPing(mockMessage.client);
    
    // Fast-forward through all timers
    jest.runAllTimers();
    
    const result = await pingPromise;
    expect(result).toBe('Measuring...');
  });

  test('should handle null client', async () => {
    const pingPromise = command.getWebSocketPing(null);
    jest.runAllTimers();
    
    const result = await pingPromise;
    expect(result).toBe('Measuring...');
  });

  test('should execute command successfully', async () => {
    const executePromise = command.execute(mockMessage);
    jest.runAllTimers();
    
    await executePromise;

    const editCall = mockSentMessage.edit.mock.calls[0][0];
    expect(editCall.embeds[0].data.fields[1].value).toBe('50ms');
    expect(editCall.embeds[0].data.footer.text).toBe('Bot Status: 🟢 Excellent Connection');
  }, 10000); // Increased timeout for this specific test

  test('should return correct color based on latency', () => {
    expect(command.getLatencyColor(50)).toBe('#00ff00');
    expect(command.getLatencyColor(150)).toBe('#ffff00');
    expect(command.getLatencyColor(250)).toBe('#ff0000');
  });

  test('should show correct connection status', () => {
    expect(command.getConnectionStatus(50, '50ms')).toBe('🟢 Excellent Connection');
    expect(command.getConnectionStatus(150, '150ms')).toBe('🟡 Good Connection');
    expect(command.getConnectionStatus(250, '250ms')).toBe('🔴 Poor Connection');
    expect(command.getConnectionStatus(50, 'Measuring...')).toBe('⚪ Establishing Connection');
  });
});
