<template>
    <q-card class="my-card">
        <q-card-section class="bg-teal text-white">
            <div class="text-h6">Surface Interval #{{diveNumber}}</div>
        </q-card-section>

        <q-input filled v-model="surfaceTime" hint="Surface Interval Time (minutes)">
            <template v-slot:append>
                <q-icon name="info">
                    <q-tooltip :delay="500" anchor="center right" self="center left" :offset="[10, 10]">
                        The minimum time before the next dive could be completed safely.
                    </q-tooltip>
                </q-icon>
            </template>
        </q-input>
    </q-card>
</template>

<script>
// import DiveValues from 'DiveValues';
export default {
  name: 'SurfaceIntervalCards',
  props: {
    diveNumber: Number,
    surfaceTime: null
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
