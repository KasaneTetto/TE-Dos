const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('한글 TE-Dos 0.1.0 - Pre1\n종료를 원할 경우 ctrl+c를 클릭하세요.');

const commands = {
    'hello': () => console.log('World!'),
    'date': () => console.log(new Date().toString()),
    'echo': (args) => console.log(args.join(' ')),
    'help': () => console.log('Available commands: hello, date, echo, help, exit, cd'),
};

const prompt = () => {
    rl.question('C:\\> ', (input) => {
        const [cmd, ...args] = input.trim().split(/\s+/);
        if (commands[cmd.toLowerCase()]) {
            commands[cmd.toLowerCase()](args);
        } else {
            console.log(`'${cmd}' 는 TE-Dos에 내장되어있지 않은 커맨드입니다.`);
        }
        prompt();
    });
};

prompt();
