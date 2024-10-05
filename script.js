document.addEventListener('DOMContentLoaded', () => {
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
});
