import DiveTable from './divetable.js'

export class Dive {
  constructor (id) {
    this.bottomt = 0
    this.ddepth = 0
    this.diveid = id
    this.spg = 'a'
    this.fpg = 'a'
    this.ssrequired = false
    this.safe = true
    this.result = null
  }

  updateDive (startpg, time, depth) {
    let maxbt = DiveTable.maxBT(startpg, depth)
    this.result = [time, depth, startpg, 'a', 0, 1]

    if (time === undefined) time = this.bottomt
    if (depth === undefined) depth = this.ddepth

    this.bottomt = time
    this.ddepth = depth
    this.spg = startpg
    this.result[2] = startpg

    // If time requested is past the maximum bottom time at depth & spg set return array to carry user recomendations for UI warnings
    if (maxbt < time || (this.diveid > 1 && startpg === 'a')) {
      this.safe = false
      this.result[0] = maxbt
      this.result[1] = DiveTable.maxDepth(time, startpg)
      this.result[5] = 0
      // find new spg if possible
      if (startpg !== 'a') {
        if (DiveTable.maxBT('a', depth) > time) {
          this.result[2] = DiveTable.minPG(time, depth)
          this.result[3] = DiveTable.diveFPG(this.result[2], depth, time)
          this.result[4] = DiveTable.ssTest(this.result[3], depth) ? 1 : 0
        }
      }
    } else {
      this.fpg = DiveTable.diveFPG(startpg, depth, time)
      this.result[3] = this.fpg
      this.ssrequired = DiveTable.ssTest(this.fpg, depth)
      this.result[4] = this.ssrequired ? 1 : 0
    }
  }

  isSafe () {
    return this.safe
  }

  getBT () {
    return this.bottomt
  }

  getDepth () {
    return this.ddepth
  }

  getSPG () {
    return this.spg
  }

  getFPG () {
    return this.fpg
  }

  getMPG () {
    return DiveTable.minPG(this.bottomt, this.ddepth)
  }

  getSS () {
    return this.ssrequired
  }

  getWarnings () {
    let string = null

    if (this.safe) string = 'Safe Dive\n'
    else string = 'Unsafe Dive, max bottom time at ' + this.ddepth + 'm' + ' is ' + this.result[0] + ' minutes diving from ' + ((this.spg === 'a') ? 'the surface' : 'pressure group ' + this.spg) + '.\n'
    if (this.diveid > 1 && this.spg === 'a') string = string + 'Dive is unsafe because of previous dive\n'

    return string
  }

  toString () {
    let output = '*********Dive ' + this.diveid + '*********\n'

    output = output + 'Bottom Time = ' + this.bottomt + ', Depth = ' + this.ddepth + ' SPG = ' + this.spg + ', FPG = ' + this.fpg + '\n'
    output = output + this.getWarnings()
    if (this.safe) {
      if (this.ssrequired) {
        output = output + 'SS Required\n'
      } else {
        output = output + 'SS not required, but always recommended.\n'
      }
    }

    output = output + '*********************\n'
    return output
  }
}

export default Dive
