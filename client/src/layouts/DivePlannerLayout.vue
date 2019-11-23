<template>
  <q-layout view="hHh lpr lFf">
    <q-header reveal bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu"/>

        <q-toolbar-title>
          Dive Planner
        </q-toolbar-title>

        <div>
          <q-btn flat label="Login/Signup" />
          <q-btn round v-if="isLoggedIn">
            <q-avatar size="42px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!--Vuex will store information about the login user so that in can be used in multiple components once-->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Dive Plans</q-item-label>
        <q-item clickable v-ripple v-for="plan in plans" v-bind:key="plan">
          <q-item-selection>{{plan}}</q-item-selection>
        </q-item>
      </q-list>
      <q-btn round color="primary" icon="add" />
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
      leftDrawerOpen: false,
      isLoggedIn: false,
      plans: ['Dive1', 'Dive2']
    }
  }
}
</script>

<style scoped>

</style>
