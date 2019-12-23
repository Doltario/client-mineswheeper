// TODO: Will  handle in-progress saves ? how rebuild a grid with stored data ? => save the "state" of the grid

class MinesWheeper {
  constructor(width = 5, height = 5, bombsNumber = 10) {
    this._width = width
    this._height = height
    this._casesNumber = width * height
    this._bombsNumber = bombsNumber
    this._bombsLeft = bombsNumber
    this._grid = []
    this.generateGrid()
    delete this._bombsLeft // Used only for generation
  }

  _fillGrid() {
    this._grid.forEach((caseItem, index) => {
      if (caseItem.hasBomb == null) {
        let r = Math.random()
        if (r < 0.5 && this._bombsLeft > 0) {
          this._grid[index].hasBomb = true
          this._bombsLeft--
        }
      }
    })
    return this
  }

  fillGrid() {
    // to fill grid with color if there are too few blue or red
    while (this._bombsLeft > 0) {
      this._fillGrid()
    }
    return this
  }

  _writeCase(hasBomb) {
    const caseItem = { revealed: false, hasBomb: hasBomb, index: null }
    this._grid.push(caseItem)
    return this
  }

  writeCase() {
    let r = Math.random()
    if (r < 0.3 && this._bombsLeft > 0) {
      this._writeCase(true)
      this._bombsLeft--
    } else if (0.3 < r < 0.6 && this._bombsLeft > 0) {
      this._writeCase(false)
      this._bombsLeft--
    } else {
      this._writeCase(null)
    }
    return this
  }

  _assignIndexes() {
    this._grid.forEach((caseItem, index) => {
      caseItem.index = index
    })
  }

  _computeNeighbors() { // felix@TODO: This is problably not the best way, but this is the simplest way I see for now
    this._grid.forEach((caseItem) => {
      caseItem.neighbors = new Array(8)
      // 0 1 2
      // 3 X 4
      // 5 6 7

      caseItem.neighbors[0] = caseItem.index - this._width -1
      caseItem.neighbors[1] = caseItem.index - this._width
      caseItem.neighbors[2] = caseItem.index - this._width + 1
      caseItem.neighbors[3] = caseItem.index - 1
      caseItem.neighbors[4] = caseItem.index + 1
      caseItem.neighbors[5] = caseItem.index + this._width - 1
      caseItem.neighbors[6] = caseItem.index + this._width
      caseItem.neighbors[7] = caseItem.index + this._width + 1

      if (caseItem.index % this._width === 0) { // Is left
        caseItem.neighbors[0] = null
        caseItem.neighbors[3] = null
        caseItem.neighbors[5] = null

      }
      if (caseItem.index % this._width === this._width - 1) { // Is right
        caseItem.neighbors[2] = null
        caseItem.neighbors[4] = null
        caseItem.neighbors[7] = null
      }
      if (caseItem.index > (this._grid.length - this._width - 1)) { // Is bottom
        caseItem.neighbors[5] = null
        caseItem.neighbors[6] = null
        caseItem.neighbors[7] = null
      }
      if (caseItem.index <= this._width) { // Is top
        caseItem.neighbors[0] = null
        caseItem.neighbors[1] = null
        caseItem.neighbors[2] = null
      }
      
      caseItem.neighbors = caseItem.neighbors.filter((neigborIndex) => {
        return neigborIndex !== null
      })
      return this
    })
  }

  findCase(caseIndex) {
    if (!caseIndex || typeof caseIndex !== 'number') {
      throw new Error (`First parameter of findCase() must be a number, ${typeof caseIndex} given`)
    }

    return this._grid.filter((caseItem) => {
      return caseItem.index === caseIndex
    })[0]
  }

  generateGrid() {
    for (let i = 0; i < this._casesNumber; i++) {
      this.writeCase()
    }

    this.fillGrid()

    this._assignIndexes()
    this._computeNeighbors()
  }

  get grid () {
    return this._grid
  }

  get height () {
    return this.height
  }

  get width () {
    return this._width
  }
}

export { MinesWheeper }
