<template>
  <div class="q-pa-sm bg-grey-10 text-white" v-if="hasPlan">
    <div class="full-width row wrap justify-start items-start content-start q-gutter-sm">
      <q-input
        standout
        dark
        outlined
        filled
        v-model="planToSubmit.name"
        @change="updateName(planToSubmit.name)"
        label="Plan Name"
      />
      <!--<q-input standout dark outlined filled type="number" v-model="altitude" label="Altitude" lazy-rules-->
        <!--:rules="[-->
        <!--val => val !== null && val !== '' || 'Please type a number',-->
        <!--val => val >= 0 && val <= 40 || 'Please type a number between 0 and 40'-->
      <!--]"-->
      <!--/>-->
        <q-input
          standout
          dark
          outlined
          filled
          type="number"
          v-model="planToSubmit.numdives"
          @change="updateNum(planToSubmit.numdives)"
          label="Number of Dives"
          :rules="[
        val => val !== null && val !== '' || 'Please type a number',
        val => val > 0 && val <= 3 || 'Please enter a number between 1 and 3'
      ]"
      />
      <note-button></note-button>
      <q-btn-dropdown color="primary" label="Options" size="lg">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Share</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Print</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Download</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class="row full-width row wrap justify-start items-start content-start">
      <q-btn color="primary" @click="saveThis" icon-right="delete" label="Save" size="sm"/>
      <q-btn color="primary" @click="deleteThis" icon-right="delete" label="Delete" size="sm"/>
    </div>
    <div class="q-pa-md">
        <div class="q-col-gutter-md fit row wrap justify-center items-start content-start">
            <div class="col-4" v-for="index in parseInt(this.plans[this.selected].numdives - 1)" v-bind:key="index">
                <surface-interval-cards :dive-number="index" @clicked="onClickChild"></surface-interval-cards>
            </div>
        </div>
    </div>
    <div class="q-pa-md">
      <div class="q-col-gutter-md row wrap justify-center items-start content-start">
        <div class="col-4" v-for="index in parseInt(this.plans[this.selected].numdives)" v-bind:key="index">
          <dive-card :diveNumber="index" @clicked="onClickChild"></dive-card>
        </div>
      </div>
    </div>
    <graph-area
        :height="500"
        :axis-full-mode="true"
        :shape="'normal'"
        :opacity="0.8"
        :border-line="true"
        :labels="labels"
        :axisFullMode="true"
        :values="values"
    >
        <note :text="'Dive Plan Layout'"></note>
        <legends :names="[ 'Dive Plan' ]"></legends>
        <guideline :tooltip-y="true"></guideline>
    </graph-area>
  </div>
  <div v-else class="absolute-center text-black">
    Please Create A New Plan
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import DiveCard from '../components/DiveCard'
import SurfaceIntervalCards from '../components/SurfaceIntervalCards'
import NoteButton from '../components/NoteButton'
export default {
  name: 'DivePlan',
  components: { NoteButton, SurfaceIntervalCards, DiveCard },
  data () {
    return {
      planName: 'Dive1',
      accept: false,
      hasPlan: true,
      planToSubmit: {}
    }
  },
  methods: {
    ...mapActions('diveplan', ['setName', 'setNum', 'deletePlan', 'fbWriteData']),
    onItemClick () {
      console.log('Clicked on an Item')
    },
    updateName (name) {
      this.setName({ id: this.plans[this.selected].id, name: name })
    },
    saveThis () {
      if (this.loggedIn) {
        this.fbWriteData()
        this.$q.notify({
          message: 'Dive Plan Saved',
          color: 'green',
          position: 'top'
        })
      } else {
        this.$q.notify({
          message: 'Please Log In to Save Plans',
          color: 'red'
        })
      }
    },
    updateNum (num) {
      this.setNum(num)
    },
    deleteThis () {
      this.deletePlan()
      if (this.selected === undefined) this.hasPlan = false
    },
    onClickButton (event) {
      this.$emit('clicked', 'someValue')
    },
    onClickChild () {
      console.log('does nothing')
    },
    save () {
      this.$q.notify({
        message: 'Dive Plan Saved',
        color: 'green',
        position: 'top'
      })
    },
    calculateGraph (dive, chart) {
      chart.push(0)
      chart.push(-Math.abs(this.dives[dive].ddepth))
      chart.push(-Math.abs(this.dives[dive].ddepth))
      if (this.dives[dive].ssrequired === true) {
        chart.push(-5)
        chart.push(-5)
        chart.push(0)
      } else {
        chart.push(0)
      }

      return chart
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn']),
    ...mapState('diveplan', ['selected', 'plans', 'dives', 'SIs']),
    ...mapGetters('diveplan', ['plan']),
    values: function () {
      let chart = []

      const dive1 = this.plans[this.selected].dive1
      chart = this.calculateGraph(dive1, chart)

      if (this.plans[this.selected].dive2) {
        const dive2 = this.plans[this.selected].dive2
        // console.log('graph dive 2', this.calculateGraph(dive2))
        chart = this.calculateGraph(dive2, chart)
      }

      if (this.plans[this.selected].dive3) {
        const dive3 = this.plans[this.selected].dive3
        chart = this.calculateGraph(dive3, chart)
      }

      return chart
    },
    labels: function () {
      let labelArr = []
      const dive1 = this.dives[this.plans[this.selected].dive1]
      let dive2 = null
      let dive3 = null
      let previousDiveTime = null
      let previousDiveTime2 = null
      const safetyStopAddedTime = 10
      labelArr.push(0)
      labelArr.push(0)
      labelArr.push(dive1.bottomt)
      if (dive1.ssrequired === true) {
        labelArr.push(parseInt(dive1.bottomt) + 5)
        labelArr.push(parseInt(dive1.bottomt) + 10)
        labelArr.push(parseInt(dive1.bottomt) + 10)
      } else {
        labelArr.push(dive1.bottomt)
      }

      if (this.plans[this.selected].dive2) {
        dive2 = this.dives[this.plans[this.selected].dive2]
        previousDiveTime = parseInt(dive1.bottomt)
        if (dive1.ssrequired === true) {
          labelArr.push(parseInt(dive1.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 10)
          labelArr.push(parseInt(dive1.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 10)
          labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 10)
        } else {
          labelArr.push(parseInt(dive1.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval))
          labelArr.push(parseInt(dive1.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval))
          labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval))
        }
        if (dive2.ssrequired === true) {
          labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 10)
          labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 15)
          labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 15)
          previousDiveTime2 = previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 15
        } else {
          if (dive1.ssrequired === true) {
            labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 10)
            previousDiveTime2 = previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval) + 10
          } else {
            labelArr.push(previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval))
            previousDiveTime2 = previousDiveTime + parseInt(dive2.bottomt) + parseInt(this.SIs[this.plans[this.selected].si1].interval)
          }
        }
      }

      if (this.plans[this.selected].dive3) {
        dive3 = this.dives[this.plans[this.selected].dive3]
        if (dive1.ssrequired === true && dive2.ssrequired === true) {
          labelArr.push(previousDiveTime2 + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 20)
          labelArr.push(previousDiveTime2 + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 20)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 20)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 25)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 30)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 30)
        } else if (dive1.ssrequired === true || dive2.ssrequired === true) {
          labelArr.push(previousDiveTime2 + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 10)
          labelArr.push(previousDiveTime2 + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 10)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 10)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 15)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 20)
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval) + 20)
        } else {
          labelArr.push(previousDiveTime2 + parseInt(this.SIs[this.plans[this.selected].si2].interval))
          labelArr.push(previousDiveTime2 + parseInt(this.SIs[this.plans[this.selected].si2].interval))
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval))
          labelArr.push(previousDiveTime2 + parseInt(dive3.bottomt) + parseInt(this.SIs[this.plans[this.selected].si2].interval))
        }
      }

      return labelArr
    }
  },
  mounted () {
    this.planToSubmit = Object.assign({}, this.plan)
  },
  watch: {
    'selected' (val) {
      this.planToSubmit = Object.assign({}, this.plans[this.selected])
      if (this.selected !== undefined) this.hasPlan = true
    }

  }
}
</script>

<style scoped>

</style>
