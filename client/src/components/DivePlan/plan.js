import Dive from './dive.js'
import SurfaceInterval from './surfaceinterval.js'

class Plan {
  constructor () {
    this.dive1 = new Dive(1)
    this.numdives = 1
    this.dive2 = null
    this.dive3 = null
    this.si1 = null
    this.si2 = null
    this.safe = true
  }

  updateNum (divenumber) {
    if (divenumber > 0 && divenumber < 4) {
      let diff = divenumber - this.numdives

      // increasing number of dives
      if (diff > 0) {
        while (diff > 0) {
          this.numdives++
          if (this.numdives === 2) {
            if (this.dive2 == null) {
              this.dive2 = new Dive(2)
              this.si1 = new SurfaceInterval(this.dive1, this.dive2)
            }
          }
          if (this.numdives === 3) {
            if (this.dive3 == null) {
              this.dive3 = new Dive(3)
              this.si2 = new SurfaceInterval(this.dive2, this.dive3)
            }
          }
          diff--
        }
      }

      // decreasing number of dives
      if (diff < 0) {
        this.numdives = divenumber
        this.updateSafe()
      }
    } else {
      console.log('Invalid number of dives')
    }
  }

  updateDive (diveid, time, depth) {
    let dive = null
    let spg = 'a'
    let si = null

    if (diveid > 0 && diveid < 4 && diveid <= this.numdives) {
      if (diveid === 1) {
        dive = this.dive1
        if (this.numdives > 1) si = this.si1
      }
      if (diveid === 2) {
        dive = this.dive2
        spg = this.si1.getFPG()
        if (this.numdives === 3) si = this.si2
      }
      if (diveid === 3) {
        dive = this.dive3
        spg = this.si2.getFPG()
      }
      dive.updateDive(time, depth, spg)
      if (si != null) si.updateInterval()
      this.updateSafe()
    } else {
      console.log('Invalid diveid')
    }
  }

  // call with negative time for min surface interval
  updateSI (siid, time) {
    let si = null

    if (siid === 1 || siid === 2) {
      if (siid === 1) si = this.si1
      if (siid === 2) si = this.si2
      si.updateInterval(time)
      if (time < 0) si.setMinInterval()
      if (siid === 1 && this.si2 !== null) this.si2.updateInterval()
    } else {
      console.log('Invalid siid')
    }
  }

  updateSafe () {
    let safety = true

    if (this.numdives === 1) {
      safety = this.dive1.isSafe()
    }

    if (this.numdives === 2) {
      safety = this.dive1.isSafe() && this.dive2.isSafe()
    }

    if (this.numdives === 3) {
      safety = this.dive1.isSafe() && this.dive2.isSafe()
    }
    this.safe = safety
  }

  isSafe () {
    return this.safe
  }

  getDepth (diveid) {
    return this.idHelper(diveid).getDepth()
  }

  getBT (diveid) {
    return this.idHelper(diveid).getBT()
  }

  idHelper (diveid) {
    let result = null

    if (diveid === 1) result = this.dive1
    if (diveid === 2) result = this.dive2
    if (diveid === 3) result = this.dive3

    return result
  }

  diveString (diveid) {
    return this.idHelper(diveid).toString()
  }

  getNum () {
    return this.numdives
  }

  toString () {
    let string = null

    if (this.numdives === 1) {
      string = this.dive1.toString()
    }

    if (this.numdives === 2) {
      string = this.dive1.toString() + this.si1.toString() + this.dive2.toString()
    }

    if (this.numdives === 3) {
      string = this.dive1.toString() + this.si1.toString() + this.dive2.toString() + this.si2.toString() + this.dive3.toString()
    }

    return string
  }
}

export default Plan
