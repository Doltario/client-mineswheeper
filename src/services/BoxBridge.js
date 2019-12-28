import { Box } from './Box'

let instance = null

class BoxBridge {
  constructor() {
    if (!instance) {
      instance = this
    }

    this._currentIndex = 0

    return instance
  }

  _linkBoxes(currentBox, boxToLink) {
    // Used Object.defineProperty() to workaround vue error 'Maximum callstack size" when applying reactivity
    // https://stackoverflow.com/questions/59509529/vue-reactivity-on-object-graph-containing-cyclic-references
    const opts = {
      configurable: false,
      enumerable: true,
      writable: true
    }
    if (currentBox && boxToLink) {
      Object.defineProperty(currentBox, '_neighbors', {
        ...opts,
        value: currentBox._neighbors ? currentBox._neighbors.concat([boxToLink]) : [boxToLink]
      })
      Object.defineProperty(boxToLink, '_neighbors', {
        ...opts,
        value: boxToLink._neighbors ? boxToLink._neighbors.concat([currentBox]) : [currentBox]
      })
    }
    return
  }

  _computeBoxNeighbors(grid, box) {
    if (!(box.index < this._width)) {
      // Is not top
      this._linkBoxes(box, grid.findBox(box.index - grid._width)) // 1
      if (!(box.index % this._width === this._width - 1)) {
        // Is not left
        this._linkBoxes(box, grid.findBox(box.index - grid._width - 1)) // 0
      }
      if (!(box.index % this._width === this._width - 1)) {
        // Is not right
        this._linkBoxes(box, grid.findBox(box.index - grid._width + 1)) // 2
      }
    }
    if (!(box.index % this._width === this._width - 1)) {
      // Is not left
      this._linkBoxes(box, grid.findBox(box.index - 1)) // 3
    }
    return
  }

  create(grid, hasBomb) {
    let createdBox = new Box(hasBomb)
    createdBox.index = this._currentIndex
    this._currentIndex++
    this._computeBoxNeighbors(grid, createdBox)

    return createdBox
  }
}

export { BoxBridge }
