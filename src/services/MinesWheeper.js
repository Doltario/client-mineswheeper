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
    const caseItem = { revealed: false, hasBomb: hasBomb }
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

  generateGrid() {
    for (let i = 0; i < this._casesNumber; i++) {
      this.writeCase()
    }

    this.fillGrid()
  }
}

export { MinesWheeper }
