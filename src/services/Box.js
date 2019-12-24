class Box {
  constructor(hasBomb = false) {
    this._neighbors = new Array(8)
    // 0 1 2
    // 3 X 4
    // 5 6 7
    this._revealed = false
    this._hasBomb = hasBomb
    this._index = null 
  }

  reveal() {
    this._revealed = true
  }

  get hasBomb () {
    return this._hasBomb
  }

  set hasBomb (hasBomb) { // felix@TODO: must be a boolean
    return this._hasBomb = hasBomb
  }

  get index() {
    return this._index
  }

  set index(index) { // felix@TODO: must be a number
    return this._index = index
  }

  get revealed() {
    return this._revealed
  }

  get nearBombs() {
    console.log(this._neighbors);
    
    return this._neighbors.filter((neighbor) => {
      return neighbor.hasBomb
    }).length
  }
}

export { Box }
