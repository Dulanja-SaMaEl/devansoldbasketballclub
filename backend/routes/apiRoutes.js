const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const storageService = require('../services/storageService');

// ----------------------------------------------------
// AUTHENTICATION ROUTES
// ----------------------------------------------------
router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@devansbasketball.lk';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPass) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET || 'devans_basketball_heritage_secret_key_2026',
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        token,
        user: { email, role: 'admin', name: 'Devans Admin' }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (err) {
    next(err);
  }
});

router.get('/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// ----------------------------------------------------
// SITE SETTINGS
// ----------------------------------------------------
router.get('/settings', async (req, res, next) => {
  try {
    const settings = await storageService.getSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

router.put('/settings', authMiddleware, async (req, res, next) => {
  try {
    const updated = await storageService.updateSettings(req.body);
    res.json({ success: true, data: updated, message: 'Site settings updated successfully' });
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------
// ADMIN DASHBOARD STATS
// ----------------------------------------------------
router.get('/admin/dashboard-stats', authMiddleware, async (req, res, next) => {
  try {
    const achievements = await storageService.getTable('achievements');
    const legends = await storageService.getTable('legends');
    const generations = await storageService.getTable('generations');
    const gallery = await storageService.getTable('gallery_images');
    const stories = await storageService.getTable('stories');
    const news = await storageService.getTable('news_articles');
    const events = await storageService.getTable('events');
    const submissions = await storageService.getTable('submissions');
    const messages = await storageService.getTable('contact_messages');

    const pendingSubmissions = submissions.filter(s => s.status === 'Pending').length;
    const pendingStories = stories.filter(s => s.status === 'Pending').length;

    res.json({
      success: true,
      stats: {
        totalAchievements: achievements.length,
        totalLegends: legends.length,
        totalGenerations: generations.length,
        totalGalleryImages: gallery.length,
        totalStories: stories.length,
        publishedArticles: news.filter(n => n.status === 'Published').length,
        upcomingEvents: events.filter(e => e.status === 'Upcoming').length,
        pendingSubmissions,
        pendingStories,
        unreadMessages: messages.filter(m => !m.is_read).length
      }
    });
  } catch (err) {
    next(err);
  }
});

// Helper for Standard CRUD endpoints
const createStandardCrud = (path, tableName) => {
  // Public GET All
  router.get(`/${path}`, async (req, res, next) => {
    try {
      let data = await storageService.getTable(tableName);
      // Filter out non-approved items for public if status column exists
      if (req.query.publicOnly === 'true') {
        if (tableName === 'stories') data = data.filter(i => i.status === 'Approved');
        if (tableName === 'news_articles') data = data.filter(i => i.status === 'Published');
      }
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  });

  // Public GET Single by ID or Slug
  router.get(`/${path}/:id`, async (req, res, next) => {
    try {
      let item;
      if (tableName === 'news_articles' && isNaN(req.params.id) && !req.params.id.includes('-')) {
        const list = await storageService.getTable(tableName);
        item = list.find(n => n.slug === req.params.id || n.id === req.params.id);
      } else {
        item = await storageService.getItemById(tableName, req.params.id);
      }
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      res.json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  });

  // Protected Admin CREATE
  router.post(`/${path}`, authMiddleware, async (req, res, next) => {
    try {
      const created = await storageService.createItem(tableName, req.body);
      res.status(201).json({ success: true, data: created, message: 'Created successfully' });
    } catch (err) {
      next(err);
    }
  });

  // Protected Admin UPDATE
  router.put(`/${path}/:id`, authMiddleware, async (req, res, next) => {
    try {
      const updated = await storageService.updateItem(tableName, req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: 'Item not found' });
      res.json({ success: true, data: updated, message: 'Updated successfully' });
    } catch (err) {
      next(err);
    }
  });

  // Protected Admin DELETE
  router.delete(`/${path}/:id`, authMiddleware, async (req, res, next) => {
    try {
      await storageService.deleteItem(tableName, req.params.id);
      res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
      next(err);
    }
  });
};

// Register Standard CRUD for all primary entities
createStandardCrud('timeline', 'timeline_entries');
createStandardCrud('generations', 'generations');
createStandardCrud('legends', 'legends');
createStandardCrud('achievements', 'achievements');
createStandardCrud('gallery', 'gallery_images');
createStandardCrud('stories', 'stories');
createStandardCrud('news', 'news_articles');
createStandardCrud('events', 'events');

// ----------------------------------------------------
// PUBLIC SUBMISSIONS (Memory & Photo Contribution by Alumni)
// ----------------------------------------------------
router.post('/submissions', async (req, res, next) => {
  try {
    const { submitter_name, submitter_email, content, type, generation_year, image_url } = req.body;
    if (!submitter_name || !submitter_email || !content) {
      return res.status(400).json({ success: false, message: 'Name, email, and content are required.' });
    }

    const submission = await storageService.createItem('submissions', {
      submitter_name,
      submitter_email,
      content,
      type: type || 'Memory',
      generation_year: generation_year || '',
      image_url: image_url || '',
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      data: submission,
      message: 'Thank you! Your memory submission has been received for moderation.'
    });
  } catch (err) {
    next(err);
  }
});

// Protected Admin GET Submissions
router.get('/admin/submissions', authMiddleware, async (req, res, next) => {
  try {
    const submissions = await storageService.getTable('submissions');
    res.json({ success: true, data: submissions });
  } catch (err) {
    next(err);
  }
});

// Protected Admin Moderate Submission (Approve/Reject)
router.put('/admin/submissions/:id', authMiddleware, async (req, res, next) => {
  try {
    const { status } = req.body;
    const submission = await storageService.getItemById('submissions', req.params.id);
    if (!submission) return res.status(404).json({ success: false, message: 'Submission not found' });

    const updated = await storageService.updateItem('submissions', req.params.id, { status });

    // If approved memory story, automatically publish into public stories
    if (status === 'Approved') {
      await storageService.createItem('stories', {
        title: `Memory by ${submission.submitter_name}`,
        author: submission.submitter_name,
        generation_name: submission.generation_year ? `${submission.generation_year}s` : 'Alumni',
        story: submission.content,
        image_url: submission.image_url || '',
        date: new Date().toISOString().split('T')[0],
        status: 'Approved'
      });
    }

    res.json({ success: true, data: updated, message: `Submission ${status.toLowerCase()} successfully.` });
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------
// CONTACT FORM SUBMISSIONS
// ----------------------------------------------------
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }

    const newMessage = await storageService.createItem('contact_messages', {
      name, email, subject: subject || 'General Inquiry', message, is_read: false
    });

    res.json({ success: true, message: 'Your message has been sent successfully.', data: newMessage });
  } catch (err) {
    next(err);
  }
});

router.get('/admin/messages', authMiddleware, async (req, res, next) => {
  try {
    const messages = await storageService.getTable('contact_messages');
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
