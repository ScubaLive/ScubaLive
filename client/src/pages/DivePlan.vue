<template>
  <div class="q-pa-sm bg-grey-10 text-white">
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
      <q-btn v-on:click="save" color="primary" icon-right="save" label="Save" size="sm"/>
      <q-btn color="primary" icon-right="delete" label="Delete" size="sm"/>
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
        :labels="[ '1Q', '2Q', '3Q', '4Q', '1Q', '2Q', '3Q', '4Q', '1Q', '2Q', '3Q', '4Q' ]"
        :axisFullMode="true"
        :values="values"
    >
        <note :text="'Area Chart'"></note>
        <legends :names="[ 'Dive1', 'Dive2', 'Dive3' ]"></legends>
        <guideline :tooltip-y="true"></guideline>
    </graph-area>
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
      altitude: null,
      accept: false,
      planToSubmit: {}
    }
  },
  methods: {
    ...mapActions('diveplan', ['setName', 'setNum']),
    onItemClick () {
      console.log('Clicked on an Item')
    },
    updateName (name) {
      this.setName({ id: this.plans[this.selected].id, name: name })
    },
    updateNum (num) {
      this.setNum(num)
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
    updateDive1 () {

    },
    updateDive2 () {

    },
    updateDive3 () {
    },
    calculateGraph (dive) {
      let array = []
      array.push(0)
      array.push(-Math.abs(this.dives[dive].ddepth))
      array.push(-Math.abs(this.dives[dive].ddepth))
      array.push(0)

      return array
    }
  },
  computed: {
    ...mapState('diveplan', ['selected', 'plans', 'dives']),
    ...mapGetters('diveplan', ['plan', 'dive']),
    values: function () {
      let chart = []
      const dive1 = this.plans[this.selected].dive1
      console.log(dive1)
      chart.push(this.calculateGraph(dive1))

      if (this.plans[this.selected].dive2 !== null) {
        const dive2 = this.plans[this.selected].dive2
        chart.push(this.calculateGraph(dive2))
      }

      if (this.plans[this.selected].dive3 !== null) {
        const dive3 = this.plans[this.selected].dive3
        chart.push(this.calculateGraph(dive3))
      }

      return chart
    }
  },
  mounted () {
    this.planToSubmit = Object.assign({}, this.plan)
  },
  watch: {
    'selected' (val) {
      this.planToSubmit = Object.assign({}, this.plans[this.selected])
    }

  }
}
</script>

<style scoped>

</style>
