<template>
  <q-layout view="hHh lpr lFf">
    <q-header reveal bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"/>

        <q-toolbar-title>
          Dive Planner
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"/>
        <q-btn
          v-else
          @click = "logoutUser"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"/>
      </q-toolbar>
    </q-header>

    <!--Vuex will store information about the login user so that in can be used in multiple components once-->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list hightlight selector>
        <plan
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          :id="plan.id"
          :to="{name: 'DivePlan'}"
          selected
        ></plan>
      </q-list>
      <q-btn round color="primary" icon="add" @click="addPlan"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'DivePlanner',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn']),
    ...mapState('diveplan', ['plans'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    ...mapActions('diveplan', ['setSelect', 'newPlan']),
    OnClick (id) {
      console.log(id)
    },
    addPlan () {
      this.newPlan()
    }
  },
  components: {
    'plan': require('components/DivePlan/plan.vue').default
  }
}
</script>

<style scoped>

</style>
