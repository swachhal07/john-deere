import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { connectDb } from './src/db.js'
import authRouter from './src/routes/auth.js'
import productsRouter from './src/routes/products.js'
import uploadRouter from './src/routes/upload.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const required = ['MONGODB_URI', 'ADMIN_PASSWORD', 'JWT_SECRET']
for (const k of required) {
  if (!process.env[k]) {
    console.error(`[fatal] missing env ${k}. Copy .env.example to .env and fill it in.`)
    process.exit(1)
  }
}

const app = express()
app.disable('x-powered-by')

const origins = (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
app.use(
  cors({
    origin: origins.length ? origins : true,
    credentials: false,
  }),
)
app.use(express.json({ limit: '2mb' }))

// Static — serve uploaded images
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads'), { fallthrough: true, maxAge: '7d' }))

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'mvdugar-backend' }))

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/upload', uploadRouter)

// JSON 404 + error fallback
app.use('/api', (_req, res) => res.status(404).json({ error: 'not found' }))
app.use((err, _req, res, _next) => {
  console.error('[err]', err)
  res.status(err.status || 500).json({ error: err.message || 'server error' })
})

const port = Number(process.env.PORT || 4000)
connectDb(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => console.log(`[mvdugar-backend] listening on :${port}`))
  })
  .catch((err) => {
    console.error('[fatal] mongo connect failed:', err.message)
    process.exit(1)
  })
