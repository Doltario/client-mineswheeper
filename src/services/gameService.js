const createGame = async options => {
  const { height, width, bombsNumber } = options
  try {
    const response = await fetch('http://localhost:3001/game', {
      method: 'POST',
      body: { width, height, bombsNumber }
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

const loadGame = async gameId => {
  try {
    const response = await fetch(`http://localhost:3001/game/${gameId}`)
    const jsonResponse = await response.json()

    return jsonResponse.game
  } catch (error) {
    console.error(`Cannot get game: ${error}`)
  }
}

export { createGame, loadGame }
