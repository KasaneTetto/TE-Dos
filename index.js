import fs from 'fs';
import readline from 'readline';
import { spawn } from 'child_process';

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
    'node': (args) => {
        const child = spawn('node', args, { stdio: 'inherit' });
        child.on('exit', () => {
            prompt();
        });
    }
};

const prompt = () => {
    const promptStr = echoEnable ? 'C:\\> ' : '';
    rl.question(promptStr, (input) => {
        const [rawCmd, ...args] = input.trim().split(/\s+/);
        const cmd = rawCmd.replace(/^@/, '');
        const lowerCmd = cmd.toLowerCase();
        
        if (lowerCmd === 'exit') {
            rl.close();
            process.exit(0);
        }
        
        if (commands[lowerCmd]) {
            if (lowerCmd === 'node') {
                commands[lowerCmd](args);
                return;
            } else {
                commands[lowerCmd](args);
            }
        } else {
            console.log(`'${cmd}' is not recognized as an internal or external command.`);
        }
        
        prompt();
    });
};

process.on('SIGINT', () => {
    if (currentChild) {
        currentChild.kill('SIGINT');
    } else {
        rl.question('정말로 종료하시겠습니까? (y/n) ', (answer) => {
            answer = answer.toLowerCase().trim();
            if (answer === 'y' || answer === 'yes') {
                rl.close();
                process.exit(0);
            } else {
                prompt();
            }
        });
    }
});

prompt();