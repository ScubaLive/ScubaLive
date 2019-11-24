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
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"/>
      </q-toolbar>
    </q-header>

    <!--Vuex will store information about the login user so that in can be used in multiple components once-->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Dive Plans</q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'DivePlanner',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style scoped>

</style>
