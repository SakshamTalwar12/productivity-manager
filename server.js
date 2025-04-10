import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { dir } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/about', (req, res)=>{
    res.sendFile(join(__dirname, 'public', 'html', 'about.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'html', 'dashboard.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});