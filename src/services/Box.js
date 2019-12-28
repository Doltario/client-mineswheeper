class Box {
  constructor(hasBomb = false) {
    this._neighbors = []
    // 0 1 2
    // 3 X 4
    // 5 6 7
    this._revealed = false
    this._hasBomb = hasBomb
    this._index = null
  }

  reveal() {
    this._revealed = true
    console.log(this)
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

  get revealed() {
    return this._revealed
  }

  get nearBombs() {
    return this._neighbors.filter(neighbor => {
      return neighbor && neighbor.hasBomb
    }).length
  }
}

export { Box }
