document.addEventListener('DOMContentLoaded', () => {
    // Initialize the terminal
    const terminal = new Terminal();
    terminal.open(document.getElementById('xterm-container'));
    
    // Add some initial logging to check script execution
    console.log('Terminal initialized and opened.');

    // Commands dictionary
    const commands = {
        help: () => "Available commands: help, cat mark_driscoll_resume.pdf, clear",
        clear: () => {
            terminal.clear();
            return '';
        },
        cat: (args) => {
            if (args[0] === 'mark_driscoll_resume.pdf') {
                return "Here's a link to my resume: [mark_driscoll_resume.pdf](./mark_driscoll_resume.pdf)";
            }
            return `File not found: ${args.join(' ')}`;
        }
    };

    // Function to process commands
    function processCommand(input) {
        const [command, ...args] = input.trim().split(/\s+/);
        if (commands[command]) {
            return commands[command](args);
        } else {
            return `Command not found: ${command}`;
        }
    }

    // Initialize the prompt
    terminal.write('> ');

    let inputBuffer = '';

    // Listen for terminal input
    terminal.onData((data) => {
        // Log input data for debugging
        console.log('Received input:', data);
        
        // Handle Enter key (ASCII code 13)
        if (data.charCodeAt(0) === 13) {
            terminal.write('\r\n');
            const outputText = processCommand(inputBuffer);
            if (outputText) {
                terminal.write(`${outputText}\r\n`);
            }
            inputBuffer = ''; // Clear input buffer
            terminal.write('> '); // Display a new prompt
        } else if (data.charCodeAt(0) === 127) { // Handle Backspace key
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.slice(0, -1);
                terminal.write('\b \b');
            }
        } else {
            inputBuffer += data;
            terminal.write(data);
        }
    });

    // Ensure the terminal is focused
    terminal.focus();
});

