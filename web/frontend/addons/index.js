const registerFunctions = import.meta.glob('./*/register.js')

const registerFrontendAddons = async ({ host }) => {
  for (const registerFunction in registerFunctions) {
    const { register } = await registerFunctions[registerFunction]()
    await register({ host })
  }
}

export {
  registerFrontendAddons
}