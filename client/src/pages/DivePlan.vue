<template>
  <div class="q-pa-sm bg-grey-10 text-white">
      <div class="full-width row wrap justify-start items-start content-start q-gutter-sm">
        <q-input standout dark outlined filled v-model="planName" label="Plan Name" :dense="dense"/>
        <!--<q-input standout dark outlined filled type="number" v-model="altitude" label="Altitude" lazy-rules-->
          <!--:rules="[-->
          <!--val => val !== null && val !== '' || 'Please type a number',-->
          <!--val => val >= 0 && val <= 40 || 'Please type a number between 0 and 40'-->
        <!--]"-->
        <!--/>-->
        <q-input standout dark outlined filled type="number" v-model="diveCount" label="Number of Dives" lazy-rules
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
        <q-btn color="primary" icon-right="save" label="Save" size="sm"/>
        <q-btn color="primary" icon-right="delete" label="Delete" size="sm"/>
      </div>
      <div class="q-pa-md">
        <div class="q-col-gutter-md fit row wrap justify-center items-start content-start">
          <div class="col-4" v-for="index in diveCount" v-bind:key="index">
            <dive-card :dive-number="index"></dive-card>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import DiveCard from '../components/DiveCard'
export default {
  name: 'DivePlan',
  components: { DiveCard },
  data () {
    return {
      planName: 'Dive1',
      altitude: null,
      diveCount: null,

      accept: false
    }
  },
  methods: {
    onItemClick () {
      console.log('Clicked on an Item')
    }
  }
}
</script>

<style scoped>

</style>
