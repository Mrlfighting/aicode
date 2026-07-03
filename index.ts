import * as fs from 'fs';
import * as path from 'path';

function parseMarkdown(md: string): string {
    let html = md;

    // Code blocks (fix bug with optional language identifier and newlines)
    html = html.replace(/```[a-z]*\r?\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Unordered Lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<ul>\n<li>$1</li>\n</ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '');

    // Paragraphs
    html = html.split('\n').map(line => {
        const trimmed = line.trim();
        if (trimmed.length === 0) return '';
        if (/^<(h[1-6]|ul|li|strong|em|a)>/.test(trimmed)) return trimmed;
        return `<p>${trimmed}</p>`;
    }).join('\n');

    return html;
}

function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Error: Please provide a markdown file to convert.');
        console.error('Usage: ts-node index.ts <file.md>');
        process.exit(1);
    }

    const filePath = path.resolve(args[0]);
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found -> ${filePath}`);
        process.exit(1);
    }

    try {
        const mdContent = fs.readFileSync(filePath, 'utf-8');
        const htmlContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Markdown to HTML</title>\n</head>\n<body>\n${parseMarkdown(mdContent)}\n</body>\n</html>`;
        
        const outputFilePath = filePath.replace(/\.md$/i, '.html');
        fs.writeFileSync(outputFilePath, htmlContent, 'utf-8');
        
        console.log(`Success! HTML generated at: ${outputFilePath}`);
    } catch (err) {
        console.error('Error during conversion:', err);
    }
}

main();
