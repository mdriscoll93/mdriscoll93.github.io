document.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    term.open(document.getElementById('xterm-container'));
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    // Buffer used to collect user input until Enter is pressed
    let inputBuffer = '';

    term.onData(data => {
        // Echo printable characters only
        if (data !== '\r' && data !== '\u007f') {
            term.write(data);
        }

        if (data === '\r') {
            // Move to a new line and process the collected input
            term.write('\r\n');
            const [command, ...args] = inputBuffer.trim().split(/\s+/);
            
            term.write(`Command: ${command}\r\n`);
            term.write(`Arguments: ${args.join(', ')}\r\n`);

            // Example command handling
            if (command === 'hello') {
                term.write('Hello there!\r\n');
            } else if (command === 'echo') {
                term.write(`${args.join(' ')}\r\n`);
            } else if (command === 'clear') {
                term.clear();
            } else if (command === 'resume') {
                term.write("Here's a link to my resume: https://www.self.so/mark-driscoll-was-here\r\n");
            } else if (command) {
                term.write(`Unknown command: ${command}\r\n`);
            }
            term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
            inputBuffer = '';
        } else if (data === '\u007f') {
            // Handle Backspace
            inputBuffer = inputBuffer.slice(0, -1);
        } else {
            inputBuffer += data;
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
