const { processCommand } = require('../js/script');

describe('processCommand', () => {
  test('help command outputs list', () => {
    expect(processCommand('help')).toBe('Available commands: help, cat, resume, clear');
  });

  test('clear command clears terminal', () => {
    const terminal = { clear: jest.fn() };
    const result = processCommand('clear', { terminal });
    expect(terminal.clear).toHaveBeenCalled();
    expect(result).toBe('');
  });
});
