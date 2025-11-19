import express from 'express';
import createShortLink from './controllers/createShortLink.js';
import linkStats from './controllers/linkStats.js';
import deleteLink from './controllers/deleteLink.js';
import listAllLinks from './controllers/listAllLinks.js'

const router = express.Router()

router.post('/links', createShortLink)

router.get('/links/:code', linkStats)

router.delete('/links/:code', deleteLink)

router.get('/links', listAllLinks)

export default router;