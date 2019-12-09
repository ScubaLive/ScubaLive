<template>
    <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">Dive #{{diveNumber}}</div>
      </q-card-section>
      <q-input filled
               hint="Max Depth (meters)" type="number" :rules="[
          val => val !== null && val !== '' || 'Please type a number',
          val => val > 0 && val <= 40 || 'Please enter a number between 1 and 40'
        ]">
        <template v-slot:append>
          <q-icon name="info">
            <q-tooltip :delay="500" anchor="center right" self="center left" :offset="[10, 10]">
              Depth limit during any point during the dive.
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
      <q-input filled hint="Bottom Time (minutes)" type="number">
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DiveCard',
  props: {
    diveNumber: {
      type: Number,
      required: true
    },
    dive: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
