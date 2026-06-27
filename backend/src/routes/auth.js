import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// POST /api/auth/login — body: { password }
router.post('/login', (req, res) => {
  const { password } = req.body || {}
  if (typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ error: 'password required' })
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'incorrect password' })
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, expiresIn: 7 * 24 * 60 * 60 })
})

// GET /api/auth/me — quick token-validity check
router.get('/me', (req, res) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ ok: false })
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    res.json({ ok: true })
  } catch {
    res.status(401).json({ ok: false })
  }
})

export default router
