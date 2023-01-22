const registerFunctions = import.meta.glob('./*/register.js')

const registerFrontendAddons = async () => {
  for (const registerFunction in registerFunctions) {
    const { register } = await registerFunctions[registerFunction]()
    register()
  }
}

export {
  registerFrontendAddons
}