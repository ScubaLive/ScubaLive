export default class DiveTable {
  static divet = [
    [10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40, 42],
    [10, 9, 8, 7, 6, 6, 5, 4, 3, 3, -1, -1],
    [20, 17, 15, 13, 11, 10, 9, 8, 6, 5, 5, 4],
    [26, 23, 19, 17, 15, 13, 12, 10, 8, 7, 6, -1],
    [30, 26, 22, 19, 16, 15, 13, 11, 9, 8, -1, 6],
    [34, 29, 24, 21, 18, 16, 15, 13, 10 - 1, 7, 7],
    [37, 32, 27, 23, 20, 18, 16, 14, 11, 9, 8, 8],
    [41, 35, 29, 25, 22, 20, 18, 15, 12, 10, 9],
    [45, 38, 32, 27, 24, 21, 19, 17, 13, 11],
    [50, 42, 35, 29, 26, 23, 21, 18, 14, 12],
    [54, 45, 37, 32, 28, 25, 22, 19, 15, 13],
    [59, 49, 40, 34, 30, 26, 24, 21, 16, 14],
    [64, 53, 43, 37, 32, 28, 25, 22, 17],
    [70, 57, 47, 39, 34, 30, 27, 23, 19],
    [75, 62, 50, 42, 36, 32, 29, 25, 20],
    [82, 66, 53, 45, 39, 34, 30, 26],
    [88, 71, 57, 48, 41, 36, 32, 28],
    [95, 76, 61, 50, 43, 38, 34, 29],
    [104, 82, 64, 53, 46, 40, 36],
    [112, 88, 68, 56, 48, 32, 37],
    [122, 94, 73, 60, 51, 44],
    [133, 101, 77, 63, 53, 45],
    [145, 108, 82, 67, 55],
    [160, 116, 87, 70, 56],
    [178, 125, 92, 72],
    [199, 134, 98],
    [219, 147],
    [22, 22, 21, 20, 19, 17, 15, 13, 10, 7, 3, 2]
  ]

  static indexToPG (index) {
    let pg = 'a'

    if (index >= 1 && index <= 26) {
      index = index + 64
      pg = String.fromCharCode(index)
    }

    return pg
  }

  static pgToIndex (pg) {
    let index = 0
    pg = pg.toString()

    if (pg !== 'a') {
      index = pg.charCodeAt(0)
      if (index >= 65 && index <= 90) index = index - 64
      else index = -1
    }

    return index
  }

  static depthIndex (depth) {
    let index = 0

    for (;DiveTable.divet[0][index] < depth; index++) {}

    return index
  }

  static timeIndex (bottomt, indexd) {
    let index = 1

    for (;DiveTable.divet[index][indexd] < bottomt; index++) {}

    return index
  }

  static offSet (spg, depth) {
    let ioffset = DiveTable.pgToIndex(spg)
    let toffset = 0

    if (ioffset !== 0) {
      toffset = DiveTable.divet[ioffset][DiveTable.depthIndex(depth)]
    }

    return [ioffset, toffset]
  }

  diveFPG (spg, depth, bottomt) {
    let indexd = 0
    let indext = 1
    let offset = DiveTable.offSet(spg, depth)
    let ioffset = offset[0]
    let toffset = offset[1]
    let fpg = 'a'

    if (ioffset >= 0 && ioffset <= 26) {
      // find correct depth column
      indexd = DiveTable.depthIndex(depth)

      // find pg for given bottom time
      indext = DiveTable.timeIndex(bottomt + toffset, indexd)

      fpg = DiveTable.indexToPG(indext)
    }

    return fpg
  }

  // Returns maximum bottom time from starting pressure group at a certain depth
  maxBT (spg, depth) {
    let indexd = DiveTable.depthIndex(depth)
    let offset = DiveTable.offSet(spg, depth)
    let toffset = offset[1]
    let maxtindex = DiveTable.divet[27][indexd] + 4
    let maxtime = DiveTable.divet[maxtindex][indexd]

    return maxtime - toffset
  }

  minPG (time, depth) {
    let dindex = DiveTable.depthIndex(depth)
    let maxt = DiveTable.divet[DiveTable.divet[27][dindex] + 4][dindex]
    let tdiff = maxt - time

    return DiveTable.indexToPG(DiveTable.timeIndex(tdiff, dindex) - 1)
  }

  maxDepth (time, spg) {
    let indext = DiveTable.pgToIndex(spg)
    let indexd = 11

    // skip depths in which dives from spg aren't allowed
    while (DiveTable.divet[27][indexd] + 4 < indext) {
      indexd--
    }

    // find depth which allows for BT at certain spg
    if (spg !== 'a') {
      while (DiveTable.divet[DiveTable.divet[27][indexd] + 4][indexd] < time + DiveTable.divet[indext][indexd]) {
        indexd--
      }
    } else {
      while (DiveTable.divet[DiveTable.divet[27][indexd] + 4][indexd] < time) {
        indexd--
      }
    }

    return DiveTable.divet[0][indexd]
  }

  ssTest (finalpg, depth) {
    let ssrequired = false
    let pgindex = DiveTable.pgToIndex(finalpg)
    let dindex = DiveTable.depthIndex(depth)

    if (pgindex >= 1 && pgindex <= 26) {
      if (pgindex > DiveTable.divet[27][dindex]) ssrequired = true
      if (depth > 25) ssrequired = true
    }

    return ssrequired
  }
}
