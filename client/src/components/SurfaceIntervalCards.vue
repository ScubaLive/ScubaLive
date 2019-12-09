<template>
  <q-card class="my-card">
    <q-card-section class="bg-teal text-white">
      <div class="text-h6">Surface Interval #{{diveNumber}}</div>
    </q-card-section>

    <q-input
      filled
      v-model="siToSubmit.interval"
      type="number"
      @click="updateTime(siToSubmit)"
      :disable="accept"
      :rules="[
          val => val !== null && val !== '' || 'Please type a number',
          val => val >= 0 || 'Please enter a positive number',
      ]"
      hint="Surface Interval Time (minutes)">
      <template v-slot:append>
        <q-icon name="info">
          <q-tooltip :delay="500" anchor="center right" self="center left" :offset="[10, 10]">
            The minimum time before the next dive could be completed safely.
          </q-tooltip>
        </q-icon>
      </template>
    </q-input>
    <div class="text-dark">
    <q-toggle v-model="accept" label="Minimum Surface Time"/>
    </div>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SurfaceIntervalCards',
  props: {
    diveNumber: Number
  },
  data () {
    return {
      id: 0,
      accept: false,
      siToSubmit: {}
    }
  },
  methods: {
    ...mapActions('diveplan', ['updateSI']),
    updateTime (payload) {
      let pack = Object.assign({}, payload)
      if (this.accept === true) {
        pack.interval = -1
      }
      this.updateSI(pack)
    }
  },
  mounted () {
    if (this.diveNumber === 1) this.id = this.plans[this.selected].si1
    if (this.diveNumber === 2) this.id = this.plans[this.selected].si2
    this.siToSubmit = Object.assign({}, this.SIs[this.id])
  },
  computed: {
    ...mapState('diveplan', ['selected', 'plans', 'SIs', 'dives'])
  },
  watch: {
    'accept' (val) {
      let payload = Object.assign({}, this.SIs[this.id])
      if (this.accept === true) {
        payload.interval = -1
        this.updateTime(payload)
      }
    }
  }
}
</script>

<style scoped>

</style>
