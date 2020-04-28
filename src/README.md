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

- For the retry button -> regenerate this game grid, not a new game
- Implement patch for save

**ROADMAP**:

- Join a session/room, not a game, and load/reload game inside this room
  > This will be a piece of work, as a transitory, when a game will be restart, it will change the game's grid
- Implement https://www.npmjs.com/package/vue-notification to inform users about people joining, leaving, etc
- When a grid is patched/updated, some schema verifications should be made to ensure this is really a string corresponding to a grid object. NOTE: maybe consider storing no string but full object and save revealed boxes separately
