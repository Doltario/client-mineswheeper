const createGame = async (options) => {
  const { height, width, bombsNumber, online } = options

  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/game`, {
      method: 'POST',
      body: JSON.stringify({ width, height, bombsNumber, online }), // felix@TODO: This is bad to stringify the body, but I can't find out how to parse the body in fastify API…
    })
    const jsonResponse = await response.json()

    return jsonResponse.game

    // felix@NOTE: Trying to do that with no observer hack (beneath) maybe fix it later

    // const game = {}

    // const opts = {
    //   configurable: false,
    //   enumerable: true,
    //   writable: true
    // }
    // Object.defineProperty(game, 'grid', {
    //   ...opts,
    //   value: jsonResponse.game.grid ? jsonResponse.game.grid : {}
    // })

    // return game
  } catch (error) {
    console.error(`Cannot post game: ${error}`)
  }
}

const loadGame = async (gameId) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/game/${gameId}`)
    const jsonResponse = await response.json()
    return jsonResponse.game
  } catch (error) {
    console.error(`Cannot get game: ${error}`)
  }
}

const saveGame = async (game) => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/game/${game._id}`, {
    method: 'PUT',
    body: JSON.stringify(game), // felix@TODO: This is bad to stringify the body, but I can't find out how to parse the body in fastify API…
  })
  const jsonResponse = await response.json()
  return jsonResponse.game
}

const resetGame = async (gameId) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/game/${gameId}/reset`, {
      method: 'PUT',
    })
    const jsonResponse = await response.json()
    return jsonResponse.game
  } catch (error) {
    console.error(`Cannot reset game: ${error}`)
  }
}

export { createGame, loadGame, saveGame, resetGame }
