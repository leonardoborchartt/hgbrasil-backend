const sequence = {
  _id: 1,
  get id() { return this._id++ }
}

const samples = {}

const getAll = () => samples

const get = (id) => samples[id] || {}

const save = (sample) => {
  if (!sample.id) {
    sample.id = sequence.id
  }

  samples[sample.id] = sample

  return sample
}

const remove = (id) => {
  const sample = samples[id]
  delete samples[id]
  return sample
}

module.exports = { getAll, get, save, remove }
