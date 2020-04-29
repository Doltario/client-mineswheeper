import Home from '@components/Home.vue'
import NewGame from '@components/NewGame.vue'
import Game from '@components/Game.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/game/new', name: 'newGame', component: NewGame },
  { path: '/game/:gameId', name: 'game', component: Game }
]

export { routes }
