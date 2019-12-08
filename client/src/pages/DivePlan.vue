<template>
  <div class="q-pa-sm bg-grey-10 text-white">
    <div class="q-gutter-sm">
      <div class="row full-width row wrap justify-start items-start content-start">
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
      </div>
      <div class="row full-width row wrap justify-start items-start content-start">
        <q-btn color="primary" icon-right="save" label="Save" size="sm"/>
        <q-btn color="primary" icon-right="delete" label="Delete" size="sm"/>
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
      </div>
      <h1>Test</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'DivePlan',
  data () {
    return {
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
    }
  },
  computed: {
    ...mapState('diveplan', ['selected', 'plans']),
    ...mapGetters('diveplan', ['dives', 'plan'])
  },
  mounted () {
    this.planToSubmit = Object.assign({}, this.plan)
    console.log(this.planToSubmit.name)
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
