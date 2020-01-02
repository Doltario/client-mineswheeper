// TODO: Will  handle in-progress saves ? how rebuild a grid with stored data ? => save the "state" of the grid
import { BoxBridge } from '@services/BoxBridge.js'
import { deepClone } from '@utils/deepClone.js'

const boxBridge = new BoxBridge()

class Grid {
  constructor(width, height, bombsNumber) {
    // felix@TODO: check params + check if width * height > bombsNumber
    this._width = width
    this._height = height
    this._boxesNumber = width * height
    this._bombsNumber = bombsNumber
    this._bombsLeft = bombsNumber
    this._boxes = []
    this.generate()
    delete this._bombsLeft // Used only for generation
  }

  get height() {
    return this._height
  }

  get width() {
    return this._width
  }

  get boxes() {
    return this._boxes
  }

  findBox(boxIndex) {
    if (boxIndex === undefined || boxIndex === null || typeof boxIndex !== 'number') {
      throw new Error(`First parameter of findBox() must be a number, ${typeof boxIndex} given`)
    }

    return this._boxes.find(box => {
      return box.index === boxIndex
    })
  }

  _fill() {
    for (let i = 0; i < this._boxes.length; i++) {
      if (this._boxes[i].hasBomb == null) {
        let r = Math.random()
        if (r < 0.5 && this._bombsLeft > 0) {
          this._boxes[i].hasBomb = true
          this._bombsLeft--
        }
      }
    }
    return this
  }

  fill() {
    // to fill grid if there are to few bombs
    while (this._bombsLeft > 0) {
      this._fill()
    }
    return this
  }

  _writeBox(hasBomb) {
    this._boxes.push(boxBridge.create(this, hasBomb))
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

  print() {
    const gridCopy = deepClone(this)

    gridCopy.boxes.map(box => {
      box._neighbors = box._neighbors.map(neighbor => {
        return neighbor.index
      })
    })
    return gridCopy
  }

  generate() {
    for (let i = 0; i < this._boxesNumber; i++) {
      this.writeBox()
    }
  }
}

export { Grid }
