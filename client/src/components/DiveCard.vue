<template>
    <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">Dive #{{diveNumber}}</div>
      </q-card-section>
{{ diveData.maxDepth}}
      <q-input filled :value="diveData.maxDepth" @input="maxDepthChange"
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
      <q-input filled :value="diveData.bottomTime" @input="bottomTimeChange" hint="Bottom Time (minutes)" type="number">
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
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      initDiveCard: 'DiveCard/initDiveCard',
      updateMaxDepth: 'DiveCard/updateMaxDepth',
      updateBottomTime: 'DiveCard/updateBottomTime'
    }),
    maxDepthChange (e) {
      const diveNumber = this.diveNumber
      const maxDepth = e
      this.updateMaxDepth({ diveNumber, maxDepth })
    },
    bottomTimeChange (e) {
      const diveNumber = this.diveNumber
      const bottomTime = e
      this.updateBottomTime({ diveNumber, bottomTime })
    }
    // saveValue() {
    //   DiveValues.
    // }.
    // onClickChild (value) {
    //   console.log(value) // someValue
    // }
  },
  computed: {
    // vuex way of getting data fields from the store
    ...mapGetters({
      data: 'DiveCard/data'
    }),
    diveData: function () {
      return this.data(this.diveNumber)
    }
    // set(title) {
    //     this.$store.commit('SET_PAGE', { title })
    // },
    // get() {
    //     return this.$store.state.page.title
    // }
  },
  created () {
    // this will set up the dive card data in the vuex store
    this.initDiveCard(this.diveNumber)
  }
}
</script>

<style scoped>

</style>
