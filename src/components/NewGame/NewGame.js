import Navigation from '@components/Navigation/Navigation.vue'
import { ToggleButton } from 'vue-js-toggle-button'
import { generateRandomName } from '@utils/animalNames'

const difficultiesMap = {
  EASY: 'easy',
  INTERMEDIATE: 'intermediate',
  HARD: 'hard',
  CUSTOM: 'custom',
}

export default {
  components: {
    Navigation,
    ToggleButton,
  },
  data() {
    return {
      width: 10,
      height: 10,
      bombsNumber: 20,
      online: false,
      nickname: generateRandomName(),
      selectedDifficulty: {},
      difficulties: [
        {
          id: difficultiesMap.EASY,
          label: 'Easy',
          width: 9,
          height: 9,
          bombsNumber: 10,
        },
        {
          id: difficultiesMap.INTERMEDIATE,
          label: 'Intermediate',
          width: 16,
          height: 16,
          bombsNumber: 40,
        },
        {
          id: difficultiesMap.HARD,
          label: 'Hard',
          width: 16,
          height: 30,
          bombsNumber: 99,
        },
        {
          id: difficultiesMap.CUSTOM,
          label: 'Custom',
          width: 20,
          height: 30,
          bombsNumber: 145,
        },
      ],
    }
  },
  created() {
    this.selectDifficulty(this.difficulties[0])
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
    selectDifficulty: function(difficulty) {
      if (!difficulty.id || !difficultiesMap[difficulty.id.toUpperCase()]) return
      this.selectedDifficulty = difficulty
      this.width = this.selectedDifficulty.width
      this.height = this.selectedDifficulty.height
      this.height = this.selectedDifficulty.height
      this.bombsNumber = this.selectedDifficulty.bombsNumber
    },
  },
}
