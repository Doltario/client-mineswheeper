# vue-client

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

Project should be launch at http://localhost:8080

**TODO**:

- Add timer
- ✅ socket for cursors
- ✅ Print people's names
- Prevent socket call in solo mode (done only for joining)
- Refactor store.players.others into something else because the current player is included in it (probably do state.players.players)
- Add customization ( flags, boxes' color, cursor color)
- Handle deconnection better (If this.\$socket.disconnected === true, alert user and display a reconnection button)
- Implement https://www.npmjs.com/package/vue-notification to inform users about people joining, leaving, etc
- Rate of bombs on game creation

**ROADMAP**:

- Implement patch for save
- Join a session/room, not a game, and load/reload game inside this room
  > This will be a piece of work, as a transitory, when a game will be restart, it will change the game's grid
- Textual chat
- Vocal chat
- When a grid is patched/updated, some schema verifications should be made to ensure this is really a string corresponding to a grid object. NOTE: maybe consider storing no string but full object and save revealed boxes separately
- Versus modes, with powerups
- nearBombs: Implemented several times, check if it is not possible to de-duplicate
- Public game

> TODOs are pretty sure to be done soon. Roadmap's items are not a priority or need more reflexion

**Notes to myself**:

- Avoid destructuring object (const {activeGame} = this.\$store.activeGame.activeGame), or "alias" for store (e.g. in a view: do not store a vueX value in data() to short the name or whatever). VueJS is bad to handle reactivity on this.
