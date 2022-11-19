function applyCommonMiddleware(operations, middleware){
  for (const operation in operations) {
    if (Object.hasOwnProperty.call(operations, operation)) {
      const element = operations[operation];

      const reversedMiddleware = middleware.reverse()
      for (let index = 0; index < reversedMiddleware.length; index++) {
        const mw = reversedMiddleware[index];
        element.unshift(mw)
      }
    }
  }
  return operations
}

export default applyCommonMiddleware