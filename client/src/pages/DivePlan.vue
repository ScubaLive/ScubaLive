<template>
  <div class="q-pa-sm bg-grey-10 text-white">
    <div class="q-gutter-sm">
      <div class="row full-width row wrap justify-start items-start content-start">
        <q-input standout dark outlined filled v-model="planName" label="Plan Name" :dense="dense"/>
        <q-input standout dark outlined filled type="number" v-model="altitude" label="Altitude" lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type a number',
          val => val >= 0 && val <= 40 || 'Please type a number between 0 and 40'
        ]"
        />
        <q-input standout dark outlined filled type="number" v-model="diveCount" label="Number of Dives" lazy-rules
                 :rules="[
          val => val !== null && val !== '' || 'Please type a number',
          val => val > 0 && val <= 3 || 'Please enter a number between 1 and 3'
        ]"
        />
        <q-btn color="primary" icon-right="description" label="Note" size="lg"/>
      </div>
      <div class="row full-width row wrap justify-start items-start content-start">
        <q-btn-dropdown color="primary" label="Options" size="sm">
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
        <q-btn color="primary" icon-right="save" label="Save" size="sm"/>
        <q-btn color="primary" icon-right="delete" label="Delete" size="sm"/>
      </div>
      <h1>Test</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivePlan',
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
