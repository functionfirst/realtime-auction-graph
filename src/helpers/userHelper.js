const isDuplicateRecord = error => error.name === 'MongoError' && error.code === 11000

const checkForUserErrors = error => {
  const userExists  = isDuplicateRecord(error)

  if (userExists) {
    throw new Error('A User with that email already exists')
  }

  if (error.errors) {
    const error = Object.values(error.errors).map(e => e.message)
    throw new Error(error)
  }
}

export {
  checkForUserErrors
}
