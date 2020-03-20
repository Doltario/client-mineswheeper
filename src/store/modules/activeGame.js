import { createGame, loadGame } from '@services/gameService'

const state = {
  activeGame: {}
}

const getters = {
  activeGame(state) {
    return state.activeGame
  }
}

const actions = {
  SOCKET_REVEAL({ dispatch }, boxIndex) {
    dispatch('reveal', boxIndex)
  },
  SOCKET_ROOM_JOINED(state, roomId) {
    console.info(`You joined ${roomId}`)
  },
  SOCKET_SOMEONE_JOINED_ROOM(state, clientId) {
    console.info(`${clientId} joined your room`)
  },

  // felix@NOTE: Above are socket callback, triggered by socket server

  async createGame({ commit }, options) {
    try {
      const createdGame = await createGame(options)

      commit('SET_ACTIVE_GAME', createdGame)

      return createdGame
    } catch (error) {
      console.error('Create game request failed', error)
    }
  },
  async getGame({ commit }, gameId) {
    try {
      const loadedGame = await loadGame(gameId)

      commit('SET_ACTIVE_GAME', loadedGame)
      return loadedGame
    } catch (error) {
      console.error('Load game request failed', error)
    }
  },
  reveal({ state: { activeGame }, commit, dispatch }, boxIndex) {
    const box = activeGame.grid.boxes[boxIndex]
    if (activeGame.ended || box.isRevealed || box.isFlagged) return

    commit('REVEAL_BOX', box)

    const nearBombs = box.neighbors.filter(boxIndex => {
      return activeGame.grid.boxes[boxIndex].hasBomb
    }).length

    if (box.hasBomb) {
      dispatch('gameOver')
    } else if (nearBombs === 0) {
      box.neighbors.forEach(neighbor => {
        dispatch('reveal', neighbor)
      })
    }
    dispatch('checkIfWon')
    return
  },

  toggleFlag({ state: { activeGame }, dispatch, commit }, boxIndex) {
    const box = activeGame.grid.boxes[boxIndex]

    if (activeGame.ended === true) return

    commit('TOGGLE_BOX_FLAG', box)

    dispatch('checkIfWon')
  },

  gameOver({ commit }) {
    commit('SET_ACTIVE_GAME_LOST')
    commit('REVEAL_ALL_BOXES')
  },

  checkIfWon({ state: { activeGame }, commit }) {
    const bombsLeft =
      activeGame.grid.bombsNumber -
      activeGame.grid.boxes.filter(box => {
        return box.isFlagged
      }).length

    if (bombsLeft === 0) {
      const flaggedBombsNumber = activeGame.grid.boxes.filter(box => {
        return box.hasBomb === true && box.isRevealed === false && box.isFlagged === true
      }).length

      const revealedBoxNumber = activeGame.grid.boxes.filter(box => {
        return box.isRevealed === true
      }).length

      if (flaggedBombsNumber + revealedBoxNumber === activeGame.grid.boxesNumber) {
        commit('SET_ACTIVE_GAME_WON')
      }
    }
  }
}

const mutations = {
  SET_ACTIVE_GAME(state, newGame) {
    state.activeGame = newGame
  },
  RESET_ACTIVE_GAME(state) {
    state.activeGame = null
  },
  REVEAL_BOX(state, box) {
    box.isRevealed = true
  },
  TOGGLE_BOX_FLAG(state, box) {
    box.isFlagged = !box.isFlagged
  },
  REVEAL_ALL_BOXES(state) {
    state.activeGame.grid.boxes.forEach(box => {
      box.isRevealed = true
    })
  },
  SET_ACTIVE_GAME_LOST(state) {
    state.activeGame.ended = true
    state.activeGame.won = false
  },
  SET_ACTIVE_GAME_WON(state) {
    state.activeGame.ended = true
    state.activeGame.won = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
