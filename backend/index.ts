import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.get('/api/articles/:slug', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: req.params.slug }
    });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

app.post('/api/articles', async (req, res) => {
  const { title, content, category, imageUrl } = req.body;
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
  try {
    const article = await prisma.article.create({
      data: { title, slug, content, category, imageUrl }
    });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create article' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
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
// KIP PIP Registration Route
app.post('/api/kippip', async (req, res) => {
  try {
    const data = req.body;
    const newReg = await prisma.registrationKipPip.create({
      data: {
        fullName: data.fullName,
        nik: data.nik,
        nisn: data.nisn,
        schoolName: data.schoolName,
        programType: data.programType,
        parentName: data.parentName,
        address: data.address,
        phoneNumber: data.phoneNumber,
      }
    });
    res.status(201).json(newReg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit registration' });
  }
});

// KIP PIP Admin Routes
app.get('/api/kippip', async (req, res) => {
  try {
    const regs = await prisma.registrationKipPip.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(regs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.put('/api/kippip/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await prisma.registrationKipPip.update({
      where: { id: Number(req.params.id) },
      data: { status }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

// Member Registration Routes
app.post('/api/members', async (req, res) => {
  try {
    const data = req.body;
    const newMember = await prisma.memberRegistration.create({
      data: {
        fullName: data.fullName,
        nik: data.nik,
        dob: data.dob,
        address: data.address,
        phone: data.phone,
        email: data.email,
        profession: data.profession,
      }
    });
    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register member' });
  }
});

app.get('/api/members', async (req, res) => {
  try {
    const members = await prisma.memberRegistration.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await prisma.memberRegistration.update({
      where: { id: Number(req.params.id) },
      data: { status }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// Aspiration Routes
app.post('/api/aspirations', async (req, res) => {
  try {
    const data = req.body;
    const newAspiration = await prisma.aspiration.create({
      data: {
        senderName: data.senderName,
        phone: data.phone,
        category: data.category,
        content: data.content,
      }
    });
    res.status(201).json(newAspiration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit aspiration' });
  }
});

app.get('/api/aspirations', async (req, res) => {
  try {
    const asps = await prisma.aspiration.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(asps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch aspirations' });
  }
});

app.put('/api/aspirations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await prisma.aspiration.update({
      where: { id: Number(req.params.id) },
      data: { status }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update aspiration' });
  }
});

// Structure Routes
app.get('/api/structures', async (req, res) => {
  try {
    const items = await prisma.structure.findMany({ orderBy: { order: 'asc' } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch structures' });
  }
});

app.post('/api/structures', async (req, res) => {
  try {
    const { name, position, imageUrl, order } = req.body;
    const newItem = await prisma.structure.create({
      data: { name, position, imageUrl, order: order || 0 }
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create structure' });
  }
});

app.put('/api/structures/:id', async (req, res) => {
  try {
    const { name, position, imageUrl, order } = req.body;
    const updated = await prisma.structure.update({
      where: { id: Number(req.params.id) },
      data: { name, position, imageUrl, order }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update structure' });
  }
});

app.delete('/api/structures/:id', async (req, res) => {
  try {
    await prisma.structure.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete structure' });
  }
});

// Settings Routes
app.get('/api/settings', async (req, res) => {
  try {
    const items = await prisma.setting.findMany();
    const settingsMap = items.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const settings = req.body; // e.g. { visi: '...', misi: '...' }
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      });
    }
    res.json({ message: 'Settings updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const articles = await prisma.article.count();
    const kipPip = await prisma.registrationKipPip.count();
    const members = await prisma.memberRegistration.count();
    const aspirations = await prisma.aspiration.count();

    const pendingKip = await prisma.registrationKipPip.count({ where: { status: 'PENDING' } });
    const unreadAspirations = await prisma.aspiration.count({ where: { status: 'UNREAD' } });

    res.json({
      articles,
      kipPip,
      members,
      aspirations,
      pendingKip,
      unreadAspirations
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Multimedia Routes
app.get('/api/multimedia', async (req, res) => {
  try {
    const items = await prisma.socialMediaEmbed.findMany({ orderBy: { order: 'asc' } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch multimedia' });
  }
});

app.post('/api/multimedia', async (req, res) => {
  try {
    const { platform, title, embedCode, order, isActive } = req.body;
    const newItem = await prisma.socialMediaEmbed.create({
      data: { platform, title, embedCode, order: order || 0, isActive: isActive ?? true }
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create multimedia' });
  }
});

app.put('/api/multimedia/:id', async (req, res) => {
  try {
    const { platform, title, embedCode, order, isActive } = req.body;
    const updated = await prisma.socialMediaEmbed.update({
      where: { id: Number(req.params.id) },
      data: { platform, title, embedCode, order, isActive }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update multimedia' });
  }
});

app.delete('/api/multimedia/:id', async (req, res) => {
  try {
    await prisma.socialMediaEmbed.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete multimedia' });
  }
});

// Serve Frontend in Production
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log('Finished index.ts initialization');
