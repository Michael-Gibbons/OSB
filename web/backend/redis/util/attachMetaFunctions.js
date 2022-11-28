import * as AllQueues from '../index.js'

const extractMeta = (req, res) => {
  // Add your things you'd like to monitor through logs here
  const meta = {
    requestId: req.id,
    locals: res.locals
  }

  return meta
}

function addWithMeta(req, res, name, data){// This function is added to the bullmq queue object, not an arrow function because we require access to 'this'
  const meta = extractMeta(req, res)

  const newData = {
    data,
    meta
  }

  this.add(name, newData)
}

function addBulkWithMeta(req, res, jobs){
  const meta = extractMeta(req, res)
  const newJobs = jobs.map(job => { return { name: job.name, data: { data: {...job.data}, meta} } })
  this.addBulk(newJobs)
}

const attachMetaFunctions = () => {
  for (const queue in AllQueues) {
    AllQueues[queue].addWithMeta = addWithMeta
    AllQueues[queue].addBulkWithMeta = addBulkWithMeta
  }
}

export default attachMetaFunctions