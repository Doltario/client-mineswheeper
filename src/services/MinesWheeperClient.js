const createGame = async () => {
  try {
    const response = await fetch('http://localhost:3001/game')
    const jsonResponse = await response.json()
    return jsonResponse
  } catch (error) {
    console.error(`Cannot fetch: ${error}`)
  }
}

export { createGame }
