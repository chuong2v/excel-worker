import mongoose from 'mongoose'

let schema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  age: Number
}, {
  collection: 'Trip'
})

export default mongoose.model('Trip', schema)