import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminShell from '../../admin/AdminShell'
import { api, auth, ApiError } from '../../lib/api'

const EMPTY = {
  slug: '',
  name: '',
  trim: '',
  hp: 45,
  drive: 'MFWD',
  clutch: 'Dual',
  tagline: '',
  description: '',
  image: '',
  features: [],
  specs: [{ label: 'Power', value: '' }],
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function VehicleForm({ mode }) {
  const nav = useNavigate()
  const { slug: routeSlug } = useParams()
  const editing = mode === 'edit'

  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [featureDraft, setFeatureDraft] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const slugTouchedRef = useRef(editing)

  useEffect(() => {
    if (!auth.token) return nav('/admin/login', { replace: true })
    if (!editing) return
    api
      .get(routeSlug)
      .then((doc) => {
        setForm({
          slug: doc.slug,
          name: doc.name || '',
          trim: doc.trim || '',
          hp: doc.hp ?? 45,
          drive: doc.drive || 'MFWD',
          clutch: doc.clutch || 'Dual',
          tagline: doc.tagline || '',
          description: doc.description || '',
          image: doc.image || '',
          features: Array.isArray(doc.features) ? doc.features : [],
          specs: Array.isArray(doc.specs) && doc.specs.length ? doc.specs : [{ label: '', value: '' }],
        })
        setLoading(false)
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          auth.signOut()
          nav('/admin/login', { replace: true })
          return
        }
        setError(err.message)
        setLoading(false)
      })
  }, [editing, routeSlug, nav])

  function update(key, value) {
    setForm((f) => {
      const next = { ...f, [key]: value }
      // Auto-fill slug from name+trim while it's untouched and we're creating
      if (!editing && !slugTouchedRef.current && (key === 'name' || key === 'trim')) {
        const auto = slugify(`${next.name} ${next.trim}`.trim())
        next.slug = auto
      }
      return next
    })
  }

  function addFeature() {
    const v = featureDraft.trim()
    if (!v) return
    setForm((f) => ({ ...f, features: [...f.features, v] }))
    setFeatureDraft('')
  }

  function removeFeature(idx) {
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }))
  }

  function updateSpec(idx, field, value) {
    setForm((f) => ({
      ...f,
      specs: f.specs.map((s, i) => (i === idx ? { ...s, [field]: value } : s)),
    }))
  }

  function addSpec() {
    setForm((f) => ({ ...f, specs: [...f.specs, { label: '', value: '' }] }))
  }

  function removeSpec(idx) {
    setForm((f) => ({ ...f, specs: f.specs.filter((_, i) => i !== idx) }))
  }

  async function handleUpload(file) {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const { url } = await api.upload(file)
      setForm((f) => ({ ...f, image: url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.slug) return setError('slug required')
    if (!form.name) return setError('name required')
    setSaving(true)
    try {
      const payload = {
        ...form,
        trim: form.trim?.trim() || null,
        hp: Number(form.hp) || 0,
        specs: form.specs.filter((s) => s.label.trim() && s.value.trim()),
        features: form.features.filter(Boolean),
      }
      if (editing) await api.update(routeSlug, payload)
      else await api.create(payload)
      nav('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminShell breadcrumb={[{ label: 'Home', to: '/admin' }, { label: 'Loading…' }]}>
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-white/40">Loading…</p>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell
      breadcrumb={[
        { label: 'Home', to: '/admin' },
        { label: 'Vehicles', to: '/admin' },
        { label: editing ? `Edit ${routeSlug}` : 'New vehicle' },
      ]}
    >
      <form
        onSubmit={onSubmit}
        className="relative mx-auto max-w-[1400px] px-6 pb-32 pt-12 md:px-10 md:pt-16"
      >
        {/* Page header */}
        <header className="flex flex-col gap-6 border-b border-white/8 pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-jd-green">
            {editing ? 'Edit vehicle' : 'New vehicle'}
          </p>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl">
            {editing ? (
              <>
                {form.name || 'Vehicle'}{' '}
                {form.trim && <span className="text-jd-yellow">/ {form.trim}</span>}
              </>
            ) : (
              <>
                Add a <span className="text-jd-yellow">vehicle.</span>
              </>
            )}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            Fill in the details below. Everything you enter here will show on
            the website. The web address (slug) must be unique.
          </p>
        </header>

        {error && (
          <div className="mt-6 border-l-2 border-red-400 bg-red-400/5 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-red-300">
            {error}
          </div>
        )}

        {/* Two-column body */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[24rem_1fr] lg:gap-14">
          {/* LEFT: photo + identity */}
          <div className="space-y-8">
            <SectionLabel num="01" label="Photo" />
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#0b110a]">
              {form.image ? (
                <img src={form.image} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center font-mono text-[11px] uppercase tracking-[0.32em] text-white/35">
                  No photo
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 grid place-items-center bg-black/60 font-mono text-[11px] uppercase tracking-[0.32em] text-jd-yellow">
                  Uploading…
                </div>
              )}
              <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-jd-yellow/60" />
              <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-jd-yellow/60" />
              <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-jd-yellow/60" />
              <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-jd-yellow/60" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleUpload(e.target.files?.[0])}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border border-white/15 px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
              >
                Upload photo
              </button>
              {form.image && (
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, image: '' }))}
                  className="border border-white/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:border-red-300 hover:text-red-300"
                >
                  Clear
                </button>
              )}
            </div>
            <Field label="Or paste an image link">
              <input
                type="text"
                value={form.image}
                onChange={(e) => update('image', e.target.value)}
                placeholder="https://… or /uploads/…"
                className="mt-2 block w-full border-0 border-b border-white/15 bg-transparent py-2 font-mono text-sm text-white outline-none placeholder:text-white/20 focus:border-jd-yellow"
              />
            </Field>

            <div className="border-t border-white/8 pt-8">
              <SectionLabel num="02" label="Basic info" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Field label="Model name" span={1}>
                <TextInput value={form.name} onChange={(v) => update('name', v)} placeholder="e.g. 5075E" />
              </Field>
              <Field label="Variant (optional)" span={1}>
                <TextInput value={form.trim} onChange={(v) => update('trim', v)} placeholder="MFWD" />
              </Field>
              <Field label="Web address (slug)" span={2} hint="Fills in automatically from the name. You can edit it.">
                <TextInput
                  value={form.slug}
                  onChange={(v) => {
                    slugTouchedRef.current = true
                    update('slug', slugify(v))
                  }}
                  placeholder="5075e-mfwd"
                  mono
                  disabled={editing}
                />
              </Field>
              <Field label="Horsepower (HP)">
                <TextInput type="number" value={form.hp} onChange={(v) => update('hp', v)} mono />
              </Field>
              <Field label="Drive type">
                <Select value={form.drive} onChange={(v) => update('drive', v)} options={['2WD', 'MFWD', '4WD']} />
              </Field>
              <Field label="Clutch type" span={2}>
                <Select value={form.clutch} onChange={(v) => update('clutch', v)} options={['Single', 'Dual']} />
              </Field>
            </div>
          </div>

          {/* RIGHT: editorial copy + features + specs */}
          <div className="space-y-10">
            <div>
              <SectionLabel num="03" label="Description" />
              <Field label="Short tagline" hint="One short line shown on the website's product card.">
                <TextInput
                  value={form.tagline}
                  onChange={(v) => update('tagline', v)}
                  placeholder="Top of the line. EQRL hydraulics, dual PTO, sync shuttle."
                />
              </Field>
              <Field label="Full description" hint="2-3 sentences. Shows on the product details page.">
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="The flagship of the 5-Series..."
                  className="mt-2 block w-full border border-white/10 bg-transparent px-3 py-2 text-sm leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-jd-yellow"
                />
              </Field>
            </div>

            <div className="border-t border-white/8 pt-8">
              <SectionLabel num="04" label="Features" hint="Short bullet points. Press Enter to add each one." />
              <div className="mt-3 flex flex-wrap gap-2">
                {form.features.map((f, i) => (
                  <span
                    key={i}
                    className="group inline-flex items-center gap-2 border border-white/15 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white"
                  >
                    {f}
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      aria-label={`Remove ${f}`}
                      className="text-white/40 transition-colors hover:text-red-300"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <input
                  type="text"
                  value={featureDraft}
                  onChange={(e) => setFeatureDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addFeature()
                    }
                  }}
                  placeholder="Type a feature and press Enter"
                  className="flex-1 border-b border-white/15 bg-transparent py-2 font-mono text-sm text-white outline-none placeholder:text-white/25 focus:border-jd-yellow"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="border-t border-white/8 pt-8">
              <SectionLabel num="05" label="Specs" hint="Add label and value pairs (e.g. Power → 75 HP)." />
              <ul className="mt-4 space-y-3">
                {form.specs.map((s, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.2fr)_2.5rem] items-center gap-3 border border-white/10 px-3 py-2"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
                      / {String(i + 1).padStart(2, '0')}
                    </span>
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => updateSpec(i, 'label', e.target.value)}
                      placeholder="Label"
                      className="bg-transparent py-1 font-mono text-[12px] uppercase tracking-[0.18em] text-white/65 outline-none placeholder:text-white/20 focus:text-white"
                    />
                    <input
                      type="text"
                      value={s.value}
                      onChange={(e) => updateSpec(i, 'value', e.target.value)}
                      placeholder="Value"
                      className="bg-transparent py-1 text-sm text-white outline-none placeholder:text-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(i)}
                      aria-label="Remove spec"
                      className="text-white/35 transition-colors hover:text-red-300"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addSpec}
                className="mt-4 inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
              >
                + Add a spec
              </button>
            </div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b110a]/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
              {editing ? 'Editing a vehicle' : 'Unsaved changes'}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => nav('/admin')}
                className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="group inline-flex items-center gap-3 bg-jd-yellow px-6 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#0b110a] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saving ? 'Saving…' : editing ? 'Save changes' : 'Save vehicle'}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminShell>
  )
}

function SectionLabel({ num, label, hint }) {
  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-jd-green">
        {num} · {label}
      </p>
      {hint && <p className="mt-1.5 text-xs text-white/40">{hint}</p>}
    </div>
  )
}

function Field({ label, hint, children, span }) {
  return (
    <label className={`block ${span === 2 ? 'col-span-2' : ''}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-white/30">{hint}</span>}
    </label>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text', mono = false, disabled = false }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`mt-2 block w-full border-0 border-b border-white/15 bg-transparent py-2 ${
        mono ? 'font-mono text-sm' : 'text-base'
      } text-white outline-none transition-colors placeholder:text-white/20 focus:border-jd-yellow disabled:cursor-not-allowed disabled:text-white/40`}
    />
  )
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 block w-full border-0 border-b border-white/15 bg-[#10180e] py-2 font-mono text-sm text-white outline-none focus:border-jd-yellow"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#10180e]">
          {o}
        </option>
      ))}
    </select>
  )
}
