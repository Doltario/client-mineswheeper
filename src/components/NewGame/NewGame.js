export default {
  data() {
    return {
      width: 10,
      height: 10,
      bombsNumber: 20,
      online: false,
      nickname: 'Lama intrépide',
    }
  },
  methods: {
    createGame: function() {
      const { width, height, bombsNumber, online, nickname } = this

      this.$store
        .dispatch('createGame', { width, height, bombsNumber, online, nickname })
        .then((createdGame) => {
          this.$router.push({ name: 'game', params: { gameId: createdGame._id } })
        })
        .catch((error) => {
          console.error('Cannot create game', error)
        })
    },
  },
}
