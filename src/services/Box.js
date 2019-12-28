class Box {
  constructor(hasBomb = false) {
    this._neighbors = []
    // 0 1 2
    // 3 X 4
    // 5 6 7
    this._isRevealed = false
    this._hasBomb = hasBomb
    this._index = null
  }

  get hasBomb() {
    return this._hasBomb
  }

  set hasBomb(hasBomb) {
    if (hasBomb !== null && typeof hasBomb !== 'boolean') {
      throw new Error(`First parameter of hasBomb setter must be a boolean or null, ${typeof hasBomb} given`)
    }
    return (this._hasBomb = hasBomb)
  }

  get index() {
    return this._index
  }

  set index(index) {
    if (typeof index !== 'number') {
      throw new Error(`First parameter of index setter must be a number, ${typeof index} given`)
    }
    return (this._index = index)
  }

  get isRevealed() {
    return this._isRevealed
  }

  get nearBombs() {
    return this._neighbors.filter(neighbor => {
      return neighbor && neighbor.hasBomb
    }).length
  }

  reveal() {
    if (this._isRevealed) return

    this._isRevealed = true
    console.log('revealing', this.index, this)

    if (this.hasBomb) {
      console.log('GAME OVER, NOOB')
    } else if (this.nearBombs === 0) {
      console.log('wesh')
      this._neighbors.forEach(neighbor => {
        neighbor.reveal()
      })
    }
  }
}

export { Box }
