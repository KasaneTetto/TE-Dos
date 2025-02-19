import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('한글 TE-DOS 0.1.0-Pre1\nCopyright (C) 2025 KasaneTetto');

let echoEnable = true;

const commands = {
    'echo': (args) => {
        if (args.length === 1 && args[0].toLowerCase() === 'off') {
            echoEnable = false;
        } else if (args.length === 1 && args[0].toLowerCase() === 'on') {
            echoEnable = true;
        } else {
            console.log(args.join(' '));
        }
    },
};

const prompt = () => {
    const promptStr = echoEnable ? 'C:\\> ' : '';
    rl.question(promptStr, (input) => {
        const [rawCmd, ...args] = input.trim().split(/\s+/);
        const cmd = rawCmd.replace(/^@/, '');
        
        if (cmd.toLowerCase() === 'exit') {
            rl.close();
            process.exit(0);
        }
        if (commands[cmd.toLowerCase()]) {
            commands[cmd.toLowerCase()](args);
        } else {
            console.log(`'${cmd}'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는\n배치 파일이 아닙니다.`);
        }
        
        prompt();
    });
};

prompt();