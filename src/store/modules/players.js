const state = {
  me: {
    nickname: '',
    socketId: null,
  },
  others: [],
}

const getters = {
  me(state) {
    return state.me
  },
  others(state) {
    return state.others
  },
}

const actions = {
  socket_roomJoined({ commit }, { roomId, socketId, players }) {
    console.info(`You joined ${roomId}`)
    commit('SET_SELF_SOCKET_ID', socketId)
    commit('SET_OTHER_PLAYERS', players)
  },
  socket_someoneJoinedRoom({ commit }, player) {
    console.info(`${player.nickname} joined your room`)
    commit('ADD_OTHER_PLAYER', player)
  },
  socket_someoneLeftRoom({ state: { others }, commit }, playerSocketId) {
    const player = others.find((player) => {
      return player.socketId === playerSocketId
    })
    console.info(`${player.nickname} left your room`)
    commit('REMOVE_OTHER_PLAYER', player)
  },
  socket_mouseMove({ commit }, { socketId, position }) {
    commit('SET_PLAYER_POSITION', { socketId, position })
  },
  // felix@NOTE: Above are socket callbacks, triggered by socket server
  setSelfNickname({ commit }, nickname) {
    // felix@TODO: Do some verifications about nickname
    commit('SET_SELF_NICKNAME', nickname)
  },
}

const mutations = {
  SET_SELF_NICKNAME(state, nickname) {
    state.me.nickname = nickname
  },
  SET_SELF_SOCKET_ID(state, socketId) {
    state.me.socketId = socketId
  },
  ADD_OTHER_PLAYER(state, player) {
    state.others.push({ ...player, position: { x: 0, y: 0 } })
  },
  REMOVE_OTHER_PLAYER(state, player) {
    const index = state.others.findIndex((otherPlayer) => {
      otherPlayer.socketId === player.socketId
    })
    state.others.splice(index, 1)
  },
  SET_OTHER_PLAYERS(state, players) {
    players.forEach((playersItem) => {
      if (!playersItem.position) {
        playersItem.position = { x: 0, y: 0 }
      }
    })
    state.others = players
  },
  SET_PLAYER_POSITION(state, { socketId, position }) {
    state.others.forEach((player) => {
      if (player.socketId === socketId) {
        player.position = position
      }
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
