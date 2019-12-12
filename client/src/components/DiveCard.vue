<template>
    <q-card class="my-card" :active="safe" active-class="bg-red-1 text-grey-8">
      <q-card-section :class="[diveToSubmit.safe ? 'bg-teal' : 'bg-red', 'text-white']">
        <div class="text-h6">Dive #{{diveNumber}}</div>
      </q-card-section>
      <q-input
        filled
        hint="Max Depth (meters)"
        type="number"
        v-model="diveToSubmit.ddepth"
        @change="updateDepth(diveToSubmit)"
        :rules="[
          val => val !== null && val !== '' || 'Please type a number',
          val => val >= 0 && val <= 40 || 'Please enter a number between 1 and 40',
        ]">
        <template v-slot:append>
          <q-icon name="info">
            <q-tooltip :delay="500" anchor="center right" self="center left" :offset="[10, 10]">
              Depth limit during any point during the dive.
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        hint="Bottom Time (minutes)"
        type="number"
        v-model="diveToSubmit.bottomt"
        @change="updateTime(diveToSubmit)"
        :rules="[
          val => val !== null && val !== '' || 'Please type a number',
          val => val >= 0 || 'Please enter a positive number',
        ]">
        <template v-slot:append>
          <q-icon name="info">
            <q-tooltip :delay="500" anchor="center right" self="center left" :offset="[10, 10]">
              The time between ending and beginning ascend.
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
    </q-card>
</template>

<script>
// import DiveValues from 'DiveValues';
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'DiveCard',
  props: {
    diveNumber: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      id: 0,
      safe: true,
      diveToSubmit: {}
    }
  },
  methods: {
    ...mapActions('diveplan', ['updateDive']),
    updateDepth (payload) {
      this.updateDive(payload)
      this.updateDiveToSubmit()
    },
    updateTime (payload) {
      this.updateDive(payload)
      this.updateDiveToSubmit()
    },
    updateDiveToSubmit () {
      if (this.diveNumber === 1) this.id = this.plans[this.selected].dive1
      if (this.diveNumber === 2) this.id = this.plans[this.selected].dive2
      if (this.diveNumber === 3) this.id = this.plans[this.selected].dive3
      this.diveToSubmit = Object.assign({}, this.dives[this.id])
    }
  },
  mounted () {
    this.updateDiveToSubmit()
  },
  computed: {
    ...mapState('diveplan', ['selected', 'plans', 'dives']),
    plan: function () {
      return this.plans[this.selected]
    },
    getWarnings () {
      let string = null

      if (this.diveToSubmit.safe) string = 'Safe Dive\n'
      else string = 'Unsafe Dive, max bottom time at ' + this.diveToSubmit.ddepth + 'm' + ' is ' + this.diveToSubmit.result[0] + ' minutes diving from ' + ((this.diveToSubmit.spg === 'a') ? 'the surface' : 'pressure group ' + this.diveToSubmit.spg) + '.\n'
      if (this.diveToSubmit.diveid > 1 && this.diveToSubmit.spg === 'a') string = string + 'Dive is unsafe because of previous dive\n'

      return string
    }
  },
  watch: {
    diveToSubmit: function () {
      if (!this.diveToSubmit.safe) {
        console.log(this.diveToSubmit)
        this.$q.notify({
          message: this.getWarnings,
          color: 'red'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
