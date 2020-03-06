import { createGame } from '@services/gameService'

const state = {
  activeGame: null,
  room: {
    id: null
  }
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
  SOCKET_JOINED(state, clientId) {
    //TODO: Not useful yet
    console.info(`${clientId} joined the game`)
  },
  async joinRoom({ commit }, roomId) {
    commit('SET_ROOM_ID', roomId)
  },
  async createGame({ commit }) {
    try {
      const createdGame = await createGame()
      commit('SET_ACTIVE_GAME', createdGame)
      return createdGame
    } catch (error) {
      console.error('Cannot create game', error)
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

  toggleFlag({ state: { activeGame }, dispatch }, boxIndex) {
    const box = activeGame.grid.boxes[boxIndex]

    if (activeGame.ended === true) return

    box.isFlagged = !box.isFlagged

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
  },
  SET_ROOM_ID(state, roomId) {
    state.room.id = roomId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
