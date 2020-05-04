import Home from '@components/Home/Home.vue'
import NewGame from '@components/NewGame/NewGame.vue'
import Game from '@components/Game/Game.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/game/new', name: 'newGame', component: NewGame },
  { path: '/game/:gameId', name: 'game', component: Game }
]

export { routes }
