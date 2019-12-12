<template>
  <q-item
    clickable
    @click.stop="selectIt"
    class="text-black"
    v-ripple
    :active='active'
    active-class="bg-teal-1 text-grey-8"
    >
    <q-item-section avatar>
      <q-icon
        name="fas fa-swimmer"
        class="text-black"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ plan.name }} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['plan', 'id'],
  data () {
    return {
      active: false,
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('diveplan', ['setSelect']),
    selectIt () {
      this.setSelect(this.id)
      this.$router.push('/dive-plan').catch(err => { console.log(err) })
    }
  },
  computed: {
    ...mapState('diveplan', ['selected'])
  },
  mounted () {
    console.log(this.id + '  ...  ' + this.selected)
    if (this.selected === this.id) this.active = true
    console.log(this.active)
  },
  watch: {
    'selected' (val) {
      if (this.selected === this.id) this.active = true
      if (this.selected !== this.id) this.active = false
    }
  }
}
</script>

<style>

</style>
