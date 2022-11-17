const parameters = [
  {
    in: 'query',
    type: 'string',
    name: 'name',
    required: true
  },
  {
    in: 'query',
    type: 'string',
    name: 'stinky',
    required: true
  }
]


//TODO: turn this into object with parameter object
const getWorldById = () => {
  // hard coded data as example
  res.status(200).send({
    data: [{ id: '1', type: "thing", attributes: { mything: true } }, { id: '2', type: "thing", attributes: { mything: true } }],
    links: { prev: '6', next: '9'}
  });
}

const getWorldByName = () => {
  // hard coded data as example
  res.status(200).send({
    data: [{ id: '1', type: "thing", attributes: { mything: true } }, { id: '2', type: "thing", attributes: { mything: true } }],
    links: { prev: '6', next: '9'}
  });
}

export default {
  parameters,
  getWorldById,
  getWorldByName
};