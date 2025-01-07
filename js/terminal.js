document.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    term.open(document.getElementById('xterm-container'));
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    term.onData(data => {
        term.write(data);
        if (data === '\r') {
            term.write('\r\n');
            const commandLine = term._core.buffer.getLine(term._core.buffer.y).translateToString(true).trim();
            const [command, ...args] = commandLine.split(/\s+/);

            term.write(`Command: ${command}\r\n`);
            term.write(`Arguments: ${args.join(', ')}\r\n`);

            // Example command handling
            if (command === 'hello') {
                term.write('Hello there!\r\n');
            } else if (command === 'echo') {
                term.write(`${args.join(' ')}\r\n`);
            } else if (command === 'clear') {
                term.clear();
            } else if (command) {
                term.write(`Unknown command: ${command}\r\n`);
            }
            term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
        }
    });

    // Function to simulate terminal input
    function simulateInput(input) {
        for (let char of input) {
            term.write(char);
        }
        term.write('\r'); // Simulate Enter key
    }

    // Simulate some input
    simulateInput('hello');
    simulateInput('echo This is a test');
});
