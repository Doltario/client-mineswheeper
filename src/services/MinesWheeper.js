import { Grid } from '@services/Grid.js'

import { deepClone } from '@utils/deepClone.js'

class MinesWheeper {
  constructor(width = 5, height = 5, bombsNumber = 10) {
    this._grid = new Grid(width, height, bombsNumber)
  }

  print() {
    const mineWheeperCopy = deepClone(this)
    
    mineWheeperCopy._grid._boxes = mineWheeperCopy._grid.print()

    return mineWheeperCopy
  }

  get grid() {
    return this._grid
  }

}

export { MinesWheeper }
