<template>
  <q-item
    @click.stop="selectIt"
    :to="{name: 'DivePlan'}"
    class="text-black"
    clickable>
    <q-item-section avatar>
      <q-icon
        name="fas fa-swimmer"
        class="text-black"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ plan.name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['plan', 'id'],
  data () {
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('diveplan', ['setSelect']),

    selectIt () {
      this.setSelect(this.id)
    }
  },
  mountetd () {
    console.log('test')
  }
}
</script>

<style>

</style>
