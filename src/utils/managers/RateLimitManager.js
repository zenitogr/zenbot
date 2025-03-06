export class RateLimitManager {
  constructor() {
    // Discord's default global rate limit is 50 requests per second
    this.globalLimit = 50;
    this.timeWindow = 1000; // 1 second in milliseconds
    this.requests = new Map();
  }

  async checkRateLimit(commandName) {
    const now = Date.now();
    const commandKey = `cmd_${commandName}`;
    
    // Clean up old entries
    this.cleanup(now);

    // Get or create command history
    if (!this.requests.has(commandKey)) {
      this.requests.set(commandKey, []);
    }

    const commandHistory = this.requests.get(commandKey);
    commandHistory.push(now);

    // Check if rate limited
    if (this.isRateLimited(commandHistory)) {
      const waitTime = this.getWaitTime(commandHistory);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.checkRateLimit(commandName); // Recursive check after waiting
    }

    return true;
  }

  isRateLimited(history) {
    return history.length >= this.globalLimit;
  }

  getWaitTime(history) {
    const oldest = history[0];
    const now = Date.now();
    return Math.max(0, this.timeWindow - (now - oldest));
  }

  cleanup(now) {
    for (const [key, history] of this.requests) {
      // Remove entries older than the time window
      const validHistory = history.filter(time => now - time < this.timeWindow);
      if (validHistory.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validHistory);
      }
    }
  }
}