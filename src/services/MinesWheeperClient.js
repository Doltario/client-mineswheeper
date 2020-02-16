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
      value: jsonResponse.grid ? jsonResponse.grid : {}
    })

    // const neighbors = jsonResponse.neighbors
    // delete jsonResponse.neighbors
    // const opts = {
    //   configurable: false,
    //   enumerable: true,
    //   writable: true
    // }
    // Object.defineProperty(jsonResponse, 'neighbors', {
    //   //TODO: remove
    //   ...opts,
    //   value: jsonResponse.neighbors ? jsonResponse.neighbors.concat(neighbors) : neighbors
    // })
    return game
  } catch (error) {
    console.error(`Cannot fetch: ${error}`)
  }
}

export { createGame }
