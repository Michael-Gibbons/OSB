
const get__UPPERCASE_PLURALIZED_NAME__ = (req, res) => { // Used in collection GET
  const { page, limit, search } = req.query
}

const post__UPPERCASE_PLURALIZED_NAME__ = (req, res) => {// Used in collection POST
  const body = req.body
}

const get__UPPERCASE_SINGULAR_NAME__ = (req, res) => {// Used in singleton GET
  const { id } = req.params.id
}

const put__UPPERCASE_SINGULAR_NAME__ = (req, res) => {// Used in singleton PUT
  const { id } = req.params.id
}

const patch__UPPERCASE_SINGULAR_NAME__ = (req, res) => {// Used in singleton PATCH
  const { id } = req.params.id
}

const delete__UPPERCASE_SINGULAR_NAME__ = (req, res) => {// Used in singleton DELETE
  const { id } = req.params.id
}

export {
  get__UPPERCASE_PLURALIZED_NAME__,
  post__UPPERCASE_PLURALIZED_NAME__,
  get__UPPERCASE_SINGULAR_NAME__,
  put__UPPERCASE_SINGULAR_NAME__,
  patch__UPPERCASE_SINGULAR_NAME__,
  delete__UPPERCASE_SINGULAR_NAME__
}