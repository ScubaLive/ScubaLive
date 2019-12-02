<template>
  <div class="q-pa-sm bg-grey-10 text-white">
    <div class="q-gutter-sm">
      <div class="row full-width row wrap justify-start items-start content-start">
        <q-input
          standout
          dark
          outlined
          filled
          v-model="diveToSubmit.name"
          @change="updateName(diveToSubmit.name)"
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
          v-model="diveToSubmit.plan.numdives"
          @change="updateNum(diveToSubmit.plan.numdives)"
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
      diveToSubmit: {},
      numofdives: 0,
      name: ''
    }
  },
  methods: {
    ...mapActions('diveplan', ['setName', 'setNum']),
    onItemClick () {
      console.log('Clicked on an Item')
    },
    updateName (name) {
      this.setName({ id: this.dives.id, name: name })
    },
    updateNum (num) {
      this.setNum({ id: this.dives.id, number: num })
    }
  },
  computed: {
    ...mapState('diveplan', ['selected']),
    ...mapGetters('diveplan', ['dives'])
  },
  mounted () {
    this.diveToSubmit = Object.assign({}, this.dives)
    this.numofdives = this.diveToSubmit.plan.numdives
    this.name = this.dives.name
    console.log(this.dives.name)
  },
  watch: {
    'selected' (val) {
      this.diveToSubmit = Object.assign({}, this.dives)
    }
  }
}
</script>

<style scoped>

</style>
