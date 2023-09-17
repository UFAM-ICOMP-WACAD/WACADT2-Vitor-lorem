import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { generateLoremIpsum } from './util.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(async (req, res) => {
    const url = req.url;

    if (url === '/') {
        try {
            const html = await fs.readFile(path.join(__dirname, 'index.html'), 'utf8');
            res.end(html);
        } catch (err) {
            console.error(`Erro ao ler arquivo HTML: ${err}`);
        }
    } else if (url === '/style.css') {
        try {
            const css = await fs.readFile(path.join(__dirname, 'style.css'), 'utf8');
            res.end(css);
        } catch (err) {
            console.error(`Erro ao ler arquivo CSS: ${err}`);
        }
    } else if (url === '/script.js') {
        try {
            const js = await fs.readFile(path.join(__dirname, 'script.js'), 'utf8');
            res.end(js);
        } catch (err) {
            console.error(`Erro ao ler arquivo JavaScript: ${err}`);
        }
    } else if (url.startsWith('/lorem?paragraphs=')) {
        const queryParams = new URLSearchParams(url.slice(7));
        const numParagraphs = parseInt(queryParams.get('paragraphs'), 10);

        if (isNaN(numParagraphs) || numParagraphs <= 0) {
            res.end('Número inválido de parágrafos');
        } else {
            const loremText = generateLoremIpsum(numParagraphs);
            res.end(loremText);
        }
    }
    else {
        res.end('Página não encontrada');
    }
});

server.listen(process.env.PORT);
