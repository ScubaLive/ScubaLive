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
          lazy-rules
          :rules="[
        val => val !== null && val !== '' || 'Please type a number',
        val => val > 0 && val <= 3 || 'Please enter a number between 1 and 3'
      ]"
      />
      <q-btn color="primary" icon-right="description" label="Note" size="lg"/>
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
              <div class="col-4" v-for="index in parseInt(diveCount - 1)" v-bind:key="index">
                  <surface-interval-cards :dive-number="index" @clicked="onClickChild"></surface-interval-cards>
              </div>
          </div>
      </div>
      <div class="q-pa-md">
        <div class="q-col-gutter-md fit row wrap justify-center items-start content-start">
          <div class="col-4" v-for="index in parseInt(diveCount)" v-bind:key="index">
            <dive-card :dive-number="index" @clicked="onClickChild"></dive-card>
          </div>
        </div>
      </div>
      <graph-area
          :height="500"
          :axis-full-mode="true"
          :shape="'normal'"
          :opacity="0.8"
          :borderline="true"
          :labels="[ '1Q', '2Q', '3Q', '4Q', '1Q', '2Q', '3Q', '4Q', '1Q', '2Q', '3Q', '4Q' ]"
          :axisFullMode="true"
          :values="values">
          <note :text="'Area Chart'"></note>
          <legends :names="[ 'Dive1', 'Dive2', 'Dive3' ]"></legends>
          <guideline :tooltip-y="true"></guideline>
      </graph-area>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import DiveCard from '../components/DiveCard'
import SurfaceIntervalCards from '../components/SurfaceIntervalCards'
export default {
  name: 'DivePlan',
  components: { SurfaceIntervalCards, DiveCard },
  data () {
    return {
      planName: 'Dive1',
      altitude: null,
      diveCount: 1,
      accept: false,
      planToSubmit: {}
    }
  },
  methods: {
    ...mapActions('diveplan', ['setName', 'setNum']),
    ...mapActions({
      initDiveCard: 'DiveCard/initDiveCard'
    }),
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
    }
  },
  computed: {
    ...mapState('diveplan', ['selected', 'plans']),
    ...mapGetters('diveplan', ['dives', 'plan']),
    ...mapState({
      diveValues: state => state.DiveCard.data
    }),
    values: function () {
      let chart = []

      Object.keys(this.diveValues).forEach(value => {
        const diveCard = this.diveValues[value]
        chart.push(0)
        chart.push(-Math.abs(diveCard.maxDepth))
        chart.push(-Math.abs(diveCard.maxDepth))
        chart.push(0)
      })

      let array = []
      array.push(chart)
      return array
    }
  },
  mounted () {
    this.planToSubmit = Object.assign({}, this.plan)
    console.log(this.planToSubmit.name)
  },
  watch: {
    'selected' (val) {
      this.planToSubmit = Object.assign({}, this.plans[this.selected])
    },
    diveValues: {
      handler: function (newValue) {
        let chart = []

        Object.keys(this.diveValues).forEach(value => {
          const diveCard = this.diveValues[value]
          chart.push(0)
          chart.push(-Math.abs(diveCard.maxDepth))
          chart.push(-Math.abs(diveCard.maxDepth))
          chart.push(0)
        })

        let array = []
        array.push(chart)
        Object.assign(this.values, array)
        console.log(this.values)
      },
      deep: true
    }

  }
}
</script>

<style scoped>

</style>
