const createGame = async () => {
  try {
    const response = await fetch('http://localhost:3001/game')
    const jsonResponse = await response.json()

    const game = {}

    const opts = {
      configurable: false,
      enumerable: true,
      writable: true
    }
    Object.defineProperty(game, 'grid', {
      ...opts,
      value: jsonResponse.game.grid ? jsonResponse.game.grid : {}
    })

    return game
  } catch (error) {
    console.error(`Cannot fetch: ${error}`)
  }
}

export { createGame }
