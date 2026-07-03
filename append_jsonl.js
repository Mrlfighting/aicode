const fs = require('fs');
const { execSync } = require('child_process');

function appendLog(round_id, prompt_content, modify_diff) {
    const commit_hash = execSync('git rev-parse HEAD').toString().trim();
    const now = new Date();
    const modify_time = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0') + ' ' + 
        String(now.getHours()).padStart(2, '0') + ':' + 
        String(now.getMinutes()).padStart(2, '0') + ':' + 
        String(now.getSeconds()).padStart(2, '0');

    const entry = {
        round_id,
        prompt_content,
        modify_diff,
        commit_hash,
        modify_time,
        agent_type: "Cline",
        dev_language: "TypeScript"
    };

    fs.appendFileSync('AI开发考核_罗波_Markdown转换工具.jsonl', JSON.stringify(entry) + '\n', 'utf-8');
}

const args = process.argv.slice(2);
const round_id = parseInt(args[0]);
const prompt_content = args[1];
const diff_file = args[2];

const diff_content = fs.readFileSync(diff_file, 'utf-8');
appendLog(round_id, prompt_content, diff_content);
console.log('JSONL record for round ' + round_id + ' appended successfully.');
