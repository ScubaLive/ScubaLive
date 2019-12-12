<template>
  <div class="absolute-center">
    <!--<q-page class="flex flex-center">-->
    <!--<img alt="ScubaDive logo" src="~assets/scuba-live-logo.png">-->
    <!--</q-page>-->
    <img src="../assets/scuba-live-logo.png"/>
    <h3 class="text-center"><span class="text-red">*PROTOTYPE*</span> DO <u>NOT</u> USE FOR REAL DIVES</h3>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-body1">ScubaLive is an online tool to plan recreational SCUBA dives up to 40 meters. ScubaLive uses PADI dive tables to allow you to plan up to three consecutive no decompression dives. To save planned dives, please create an account</div>
        <hr/>
        <div class="text-body2"><b>DISCLAIMER:</b> All dive times are based on PADI dive tables for no decompression dives on air only. The dive planner will display required safety stops at 5 meters for 3 minutes as required. However, PADI recommends divers take the standard safety stop on all dives past 10 meters.</div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <!--Use routervue js Navigation guard "beforeEnter" so it checks route-->
        <q-btn :to="{name: 'DivePlan'}" @click="onAccept" color="primary" label="Get Started"/>
      </q-card-actions>
    </q-card>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LandingPage',
  methods: {
    ...mapActions('auth', ['acceptUser']),
    onAccept () {
      this.acceptUser()
    }
  }
}
</script>

<style scoped>

</style>
