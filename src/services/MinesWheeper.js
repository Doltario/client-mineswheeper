// TODO: Will  handle in-progress saves ? how rebuild a grid with stored data ? => save the "state" of the grid
import { Box } from '@services/Box.js'
import { deepClone } from '@utils/deepClone.js'

class MinesWheeper {
  constructor(width = 5, height = 5, bombsNumber = 10) {
    this._width = width
    this._height = height
    this._boxesNumber = width * height
    this._bombsNumber = bombsNumber
    this._bombsLeft = bombsNumber
    this._grid = []
    this.generateGrid()
    delete this._bombsLeft // Used only for generation
  }

  _fillGrid() {
    this._grid.forEach((box, index) => {
      if (box.hasBomb == null) {
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
    // to fill grid if there are to few bombs
    while (this._bombsLeft > 0) {
      this._fillGrid()
    }
    return this
  }

  _writeBox(hasBomb) {
    this._grid.push(new Box(hasBomb))
    return this
  }

  writeBox() {
    let r = Math.random()
    if (r < 0.3 && this._bombsLeft > 0) {
      this._writeBox(true)
      this._bombsLeft--
    } else if (0.3 < r < 0.6 && this._bombsLeft > 0) {
      this._writeBox(false) // felix@TODO: ?? does it even work ? It seems that no box has hasBomb set to false, only true or null
      this._bombsLeft--
    } else {
      this._writeBox(null)
    }
    return this
  }

  _assignIndexes() { // Do as BoxFactory that handles index assignment
    this._grid.forEach((box, index) => {
      box.index = index
    })
  }

  _computeNeighbors() { // felix@TODO: This is problably not the best way, but this is the simplest way I see for now
    this._grid.forEach((box) => {
      box._neighbors[0] = this.findBox(box.index - this._width -1)
      box._neighbors[1] = this.findBox(box.index - this._width)
      box._neighbors[2] = this.findBox(box.index - this._width + 1)
      box._neighbors[3] = this.findBox(box.index - 1)
      box._neighbors[4] = this.findBox(box.index + 1)
      box._neighbors[5] = this.findBox(box.index + this._width - 1)
      box._neighbors[6] = this.findBox(box.index + this._width)
      box._neighbors[7] = this.findBox(box.index + this._width + 1)

      if (box.index % this._width === 0) { // Is left
        box._neighbors[0] = null
        box._neighbors[3] = null
        box._neighbors[5] = null
      }

      if (box.index % this._width === this._width - 1) { // Is right
        box._neighbors[2] = null
        box._neighbors[4] = null
        box._neighbors[7] = null
      }

      if (box.index > (this._grid.length - this._width - 1)) { // Is bottom
        box._neighbors[5] = null
        box._neighbors[6] = null
        box._neighbors[7] = null
      }

      if (box.index < this._width) { // Is top
        box._neighbors[0] = null
        box._neighbors[1] = null
        box._neighbors[2] = null
      }
      
      box._neighbors = box._neighbors.filter((neigborIndex) => {
        return neigborIndex !== null
      })
      return this
    })
  }

  findBox(boxIndex) {
    if (boxIndex === undefined || boxIndex === null || typeof boxIndex !== 'number') {
      throw new Error (`First parameter of findBox() must be a number, ${typeof boxIndex} given`)
    }

    return this._grid.filter((box) => {
      return box.index === boxIndex
    })[0]
  }

  generateGrid() {
    for (let i = 0; i < this._boxesNumber; i++) {
      this.writeBox()
    }

    this.fillGrid()

    this._assignIndexes()
    this._computeNeighbors()
  }

  print() {
    const mineWheeperCopy = deepClone(this)
    mineWheeperCopy._grid.map((box) => {
      box._neighbors = box._neighbors.map((neighbor) => {
        return neighbor.index
      })
    })
    return mineWheeperCopy
  }

  get grid() {
    return this._grid
  }

  get height() {
    return this.height
  }

  get width() {
    return this._width
  }
}

export { MinesWheeper }
