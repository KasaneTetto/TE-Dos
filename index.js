import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('한글 TE-DOS 0.1.0-Pre1\nCopyright (C) 2025 KasaneTetto');

let echoEnabled = true;

const commands = {
    'hello': () => console.log('World!'),
    'echo': (args) => {
        if (args.length === 1 && (args[0].toLowerCase() === 'off' || args[0].toLowerCase() === 'on')) {
            echoEnabled = args[0].toLowerCase() === 'on';
        } else {
            console.log(args.join(' '));
        }
    },
};

const prompt = () => {
    rl.question('C:\\> ', (input) => {
        const [rawCmd, ...args] = input.trim().split(/\s+/);
        const cmd = rawCmd.replace(/^@/, '');
        const suppressOutput = rawCmd.startsWith('@');
        
        if (!suppressOutput && echoEnabled && cmd.toLowerCase() !== 'echo') {
            console.log(input);
        }
        
        if (cmd.toLowerCase() === 'exit') {
            rl.close();
            process.exit(0);
        }
        if (commands[cmd.toLowerCase()]) {
            commands[cmd.toLowerCase()](args);
        } else {
            console.log(`'${cmd}' 은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.`);
        }
        
        setTimeout(prompt, 0);
    });
};

prompt();
