import mongoose from 'mongoose'

const SpecSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const ProductSchema = new mongoose.Schema(
  {
    slug:        { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    name:        { type: String, required: true, trim: true },
    trim:        { type: String, default: null, trim: true },
    hp:          { type: Number, required: true, min: 1 },
    drive:       { type: String, required: true, enum: ['2WD', 'MFWD', '4WD'] },
    clutch:      { type: String, required: true, enum: ['Single', 'Dual'] },
    tagline:     { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image:       { type: String, default: '' },
    features:    { type: [String], default: [] },
    specs:       { type: [SpecSchema], default: [] },
    archived:    { type: Boolean, default: false },
  },
  { timestamps: true },
)

ProductSchema.method('toJSON', function () {
  const o = this.toObject()
  o.id = o.slug
  delete o._id
  delete o.__v
  return o
})

export const Product = mongoose.model('Product', ProductSchema)
