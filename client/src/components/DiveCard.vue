<template>
    <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">Dive #{{diveNumber}}</div>
      </q-card-section>

      <q-input filled v-model="maxDepth" hint="Max Depth (meters)" :dense="dense">
        <template v-slot:append>
          <q-icon name="info">
            <q-tooltip :delay="500" anchor="center right" self="center left" :offset="[10, 10]">
              Depth limit during any point during the dive.
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
      <q-input filled v-model="bottomTime" hint="Bottom Time (minutes)" :dense="dense">
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
export default {
  name: 'DiveCard',
  props: {
    diveNumber: Number,
    maxDepth: null,
    bottomTime: null
  },
  methods: {
    // saveValue() {
    //   DiveValues.
    // }.
    // onClickChild (value) {
    //   console.log(value) // someValue
    // }
  }
}
</script>

<style scoped>

</style>
