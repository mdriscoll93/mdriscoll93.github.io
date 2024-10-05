import { Terminal } from 'xterm';

document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
    terminal.open(document.getElementById('xterm-container'));

    // Commands dictionary
    const commands = {
        help: () => "Available commands: help, cat mark_driscoll_resume.pdf, clear",
        clear: () => {
            terminal.clear();
            return '';
        },
        'cat mark_driscoll_resume.pdf': () => "Here's a link to my resume: [mark_driscoll_resume.pdf](./mark_driscoll_resume.pdf)"
    };

    // Function to process commands
    function processCommand(input) {
        const command = input.trim();
        if (commands[command]) {
            return commands[command]();
        } else {
            return `Command not found: ${command}`;
        }
    }

    // Initialize the prompt
    terminal.write('> ');

    let inputBuffer = '';

    // Listen for terminal input
    terminal.onData((data) => {
        // Handle Enter key (ASCII code 13)
        if (data.charCodeAt(0) === 13) {
            terminal.write('\r\n'); // Move to the next line
            const outputText = processCommand(inputBuffer);
            if (outputText) {
                terminal.write(`${outputText}\r\n`);
            }
            inputBuffer = ''; // Clear input buffer
            terminal.write('> '); // Display a new prompt
        }
        // Handle Backspace (ASCII code 127)
        else if (data.charCodeAt(0) === 127) {
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.slice(0, -1); // Remove last character
                terminal.write('\b \b'); // Erase the last character on the terminal
            }
        }
        // Handle other input
        else {
            inputBuffer += data;
            terminal.write(data);
        }
    });
});

