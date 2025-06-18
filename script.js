// Commands dictionary. Commands may use the optional context object which can
// contain a `terminal` instance for commands that need direct access to the
// xterm API (e.g. `clear`).
const commands = {
    help: () => "Available commands: help, cat, resume, clear",
    clear: (_args, ctx) => {
        if (ctx && ctx.terminal) {
            ctx.terminal.clear();
        }
        return '';
    },
    // The cat command only displays a not-found message since no files are
    // currently bundled with the site
    cat: (args) => {
        return `File not found: ${args.join(' ')}`;
    },
    // Display an online resume link
    resume: () => {
        return "Here's a link to my resume: https://www.self.so/mark-driscoll-was-here";
    }
};

// Function to process commands. The optional `ctx` parameter allows passing the
// terminal instance when running in the browser.
function processCommand(input, ctx = {}) {
    const [command, ...args] = input.trim().split(/\s+/);
    if (commands[command]) {
        return commands[command](args, ctx);
    } else {
        return `Command not found: ${command}`;
    }
}

// When running in the browser attach the terminal behaviour.
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize the terminal
        const terminal = new Terminal();
        terminal.open(document.getElementById('xterm-container'));

        // Add some initial logging to check script execution
        console.log('Terminal initialized and opened.');

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
                const outputText = processCommand(inputBuffer, { terminal });
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
}

// Export for testing in Node environments
if (typeof module !== 'undefined') {
    module.exports = { processCommand };
}

