import { createGame } from '@services/MinesWheeperClient'

const state = {
  activeGame: null
}

const getters = {
  activeGame(state) {
    return state.activeGame
  }
}

const actions = {
  async createGame({ commit }) {
    try {
      const createdGame = await createGame()
      commit('SET_ACTIVE_GAME', createdGame)
      return createdGame
    } catch (error) {
      console.log('Cannot create game', error)
    }
  },

  async reveal({ state: { activeGame }, commit, dispatch }, boxIndex) {
    const box = activeGame.grid.boxes[boxIndex]
    if (box.isRevealed || box.isFlagged) return

    commit('REVEAL_BOX', box)

    const nearBombs = box.neighbors.filter(boxIndex => {
      return activeGame.grid.boxes[boxIndex].hasBomb
    }).length

    if (box.hasBomb) {
      return console.log('Game over')
    } else if (nearBombs === 0) {
      box.neighbors.forEach(neighbor => {
        dispatch('reveal', neighbor)
      })
    }
    return
    // this._parentGrid.checkIfWon()
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
