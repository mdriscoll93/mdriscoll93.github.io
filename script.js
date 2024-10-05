document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  // Initialize the terminal
  const terminalContainer = document.getElementById('terminal-container');
  const terminal = new Terminal({
      cols: 80,
      rows: 24,
      cursorBlink: true,
      theme: {
          background: '#083952', // Background color
          foreground: '#f8f8f8', // Default text color
          cursor: '#52a563',     // Cursor color (green)
      },
  });

  // Open the terminal
  terminal.open(terminalContainer);
  terminal.write('\x1b[32m$\x1b[0m Welcome to Mark\'s Interactive Terminal!\r\n'); // Green dollar sign for prompt
  terminal.write('\x1b[32m$\x1b[0m '); // Initial prompt

  // Handle user input
  terminal.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.key === 'Enter') {
          const command = terminal.buffer.active.getLine(terminal.buffer.active.cursorY - 1).translateToString().trim();
          handleCommand(command);
          terminal.write('\r\n\x1b[32m$\x1b[0m '); // New prompt after command execution
      } else if (printable) {
          terminal.write(key);
      }
  });

  // Command handler function
  function handleCommand(command) {
      switch (command) {
          case 'help':
              terminal.write('Available commands: help, cat mark_driscoll_resume.pdf, clear\r\n');
              break;
          case 'cat mark_driscoll_resume.pdf':
              terminal.write('Here\'s a link to my resume: \x1b[34m<a href="https://example.com/mark_driscoll_resume.pdf" target="_blank">mark_driscoll_resume.pdf</a>\x1b[0m\r\n');
              break;
          case 'clear':
              terminal.clear();
              break;
          default:
              terminal.write(`Command not found: ${command}\r\n`);
      }
  }
=======
    const userInput = document.getElementById('user-input');
    const output = document.getElementById('output');

    const commands = {
        help: () => "Available commands: help, cat mark_driscoll_resume.pdf, clear",
        clear: () => {
            output.innerHTML = '';
            return '';
        },
        'cat mark_driscoll_resume.pdf': () => "Here's a link to my resume: [mark_driscoll_resume.pdf](./mark_driscoll_resume.pdf)",
    };

    function processCommand(input) {
        const command = input.trim();
        if (commands[command]) {
            return commands[command]();
        } else {
            return `Command not found: ${command}`;
        }
    }

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputText = userInput.value;
            const outputText = processCommand(inputText);
            output.innerHTML += `<div>> ${inputText}</div><div>${outputText}</div>`;
            userInput.value = ''; // Clear the input
            output.scrollTop = output.scrollHeight; // Scroll to the bottom
        }
    });
>>>>>>> bffdad3b4605664e6908b2fdab17551735c12d27
});
