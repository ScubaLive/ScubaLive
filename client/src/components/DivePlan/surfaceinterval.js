import SurfaceTable from './surfacetable.js'

class SurfaceInterval {
  constructor (dive1, dive2, table) {
    let sdive = dive1
    let fdive = dive2
    let interval = 0
    let stable = table
    let spg = dive1.getFPG()
    let fpg = spg
    fdive.updateDive(fpg, 0, 0)
  }

  updateInterval (time) {
    if (time === undefined) time = this.interval
    this.spg = this.sdive.getFPG()
    this.interval = time
    this.fpg = SurfaceTable.getEndingPressureGroup(this.spg, time)
    this.fdive.updateDive(this.fpg)
  }

  setMinInterval () {
    this.interval = SurfaceTable.getSurfaceIntervalTime(this.sdive.getFPG(), this.fdive.getMPG())[0]
    this.updateInterval()
  }

  getFPG () {
    return this.fpg
  }

  getSPG () {
    return this.spg
  }

  getInterval () {
    return this.interval
  }

  toString () {
    return 'Stay on surface for ' + this.interval + ' minutes.\n'
  }
}

export default SurfaceInterval
