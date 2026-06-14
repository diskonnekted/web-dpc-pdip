import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'PDIP Banjarnegara API is running' });
});
// Admin Auth Routes (Placeholder)
app.post('/api/auth/login', async (req, res) => {
    // TODO: implement login
    res.json({ token: 'dummy-token' });
});
// Articles Routes (Public & Admin)
app.get('/api/articles', async (req, res) => {
    const articles = await prisma.article.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' }
    });
    res.json(articles);
});
app.post('/api/articles', async (req, res) => {
    const { title, content, category, imageUrl } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    try {
        const article = await prisma.article.create({
            data: { title, slug, content, category, imageUrl }
        });
        res.json(article);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create article' });
    }
});
app.delete('/api/articles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.article.delete({ where: { id: Number(id) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete article' });
    }
});
// Structure Routes
app.get('/api/structures', async (req, res) => {
    const structures = await prisma.structure.findMany({
        orderBy: { order: 'asc' }
    });
    res.json(structures);
});
// Settings Routes
app.get('/api/settings', async (req, res) => {
    const settings = await prisma.setting.findMany();
    res.json(settings);
});
const PORT = process.env.PORT || 5000;
console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log('Finished index.ts initialization');
