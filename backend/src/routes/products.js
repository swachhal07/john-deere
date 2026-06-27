import { Router } from 'express'
import { Product } from '../models/Product.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function sanitize(body) {
  const allowed = ['slug', 'name', 'trim', 'hp', 'drive', 'clutch', 'tagline', 'description', 'image', 'features', 'specs']
  const out = {}
  for (const k of allowed) if (k in body) out[k] = body[k]
  if (typeof out.hp === 'string') out.hp = Number(out.hp)
  if (Array.isArray(out.features)) {
    out.features = out.features.map((s) => String(s).trim()).filter(Boolean)
  }
  if (Array.isArray(out.specs)) {
    out.specs = out.specs
      .map((s) => ({ label: String(s.label || '').trim(), value: String(s.value || '').trim() }))
      .filter((s) => s.label && s.value)
  }
  return out
}

// GET /api/products — public list (non-archived)
router.get('/', async (req, res) => {
  const list = await Product.find({ archived: { $ne: true } }).sort({ hp: -1, createdAt: -1 })
  res.json(list)
})

// GET /api/products/:slug — public detail
router.get('/:slug', async (req, res) => {
  const doc = await Product.findOne({ slug: req.params.slug })
  if (!doc) return res.status(404).json({ error: 'not found' })
  res.json(doc)
})

// --- Admin endpoints below --------------------------------------------------

// POST /api/products — create
router.post('/', requireAuth, async (req, res) => {
  try {
    const data = sanitize(req.body)
    if (!data.slug) return res.status(400).json({ error: 'slug required' })
    const doc = await Product.create(data)
    res.status(201).json(doc)
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'slug already exists' })
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/products/:slug — update
router.put('/:slug', requireAuth, async (req, res) => {
  try {
    const data = sanitize(req.body)
    const doc = await Product.findOneAndUpdate({ slug: req.params.slug }, data, { new: true, runValidators: true })
    if (!doc) return res.status(404).json({ error: 'not found' })
    res.json(doc)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/products/:slug — hard delete
router.delete('/:slug', requireAuth, async (req, res) => {
  const result = await Product.deleteOne({ slug: req.params.slug })
  if (result.deletedCount === 0) return res.status(404).json({ error: 'not found' })
  res.json({ ok: true })
})

export default router
