# Installing project

```
$ yarn install
```

# Launching project

```
$ npm run serve
```

Project should be launch at http://localhost:8080

**TODO**:

- Implement patch for save
- socket for cursors
- Print people's names
- Prevent socket call in solo mode (done only for joining)
- Refactor store.players.others into something else because the current player is included in it (probably do state.players.players)

**ROADMAP**:

- Add timer
- Join a session/room, not a game, and load/reload game inside this room
  > This will be a piece of work, as a transitory, when a game will be restart, it will change the game's grid
- Textual chat
- Vocal chat
- Implement https://www.npmjs.com/package/vue-notification to inform users about people joining, leaving, etc
- When a grid is patched/updated, some schema verifications should be made to ensure this is really a string corresponding to a grid object. NOTE: maybe consider storing no string but full object and save revealed boxes separately
- Versus modes, with powerups
- nearBombs: Implemented several times, check if it is not possible to de-duplicate

**Notes to myself**:
- Avoid destructuring object (const {activeGame} = this.$store.activeGame.activeGame), or "alias" for store (e.g. in a view: do not store a vueX value in data() to short the name or whatever). VueJS is bad to handle reactivity on this.