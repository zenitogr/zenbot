import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { PingCommand } from '../PingCommand.js';

describe('PingCommand', () => {
  let command;
  let mockMessage;
  let mockSentMessage;

  beforeEach(() => {
    command = new PingCommand();
    
    mockSentMessage = {
      createdTimestamp: 1000,
      edit: jest.fn().mockResolvedValue({}),
    };

    mockMessage = {
      createdTimestamp: 900,
      reply: jest.fn().mockResolvedValue(mockSentMessage)
    };
  });

  test('should execute command successfully', async () => {
    await command.execute(mockMessage);
    
    const editCall = mockSentMessage.edit.mock.calls[0][0];
    expect(editCall.embeds[0].data.fields[0].value).toBe('100ms');
    expect(editCall.embeds[0].data.footer.text).toBe('Bot Status: 🟡 Good Connection');
  });

  test('should return correct color based on latency', () => {
    expect(command.getLatencyColor(50)).toBe('#00ff00');
    expect(command.getLatencyColor(150)).toBe('#ffff00');
    expect(command.getLatencyColor(250)).toBe('#ff0000');
  });

  test('should show correct connection status', () => {
    expect(command.getConnectionStatus(50)).toBe('🟢 Excellent Connection');
    expect(command.getConnectionStatus(150)).toBe('🟡 Good Connection');
    expect(command.getConnectionStatus(250)).toBe('🔴 Poor Connection');
  });
});
