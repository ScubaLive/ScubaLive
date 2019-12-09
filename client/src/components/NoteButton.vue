<template>
    <div>
        <q-btn color="primary" icon-right="description" label="Note" size="lg" @click="toolbar = true"/>
        <q-dialog v-model="toolbar">
            <q-card style="width: 500px">
                <q-toolbar>
                    <q-toolbar-title><span class="text-weight-bold">Notes</span></q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>
                <q-separator />
                <q-card-section>
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >
                        <q-input
                            type="date"
                            filled
                            v-model="task"
                            label="Date"
                        />
                        <q-input
                            filled
                            type="text"
                            v-model="goal"
                            label="Location"
                        />
                        <div>
                            <q-btn label="Submit" type="submit" color="primary"/>
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
  name: 'NoteButton',
  data () {
    return {
      todoList: [],
      toolbar: false,
      task: null,
      goal: null,
      category: {
        label: null,
        value: null,
        icon: null
      }
    }
  },
  methods: {
    onSubmit () {
      // let todo = {
      //   task: null,
      //   goal: null,
      //   category: null
      // }
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Task Added'
      })
    },

    onReset () {
      this.task = null
      this.goal = null
      this.category = null
    }
  }
}
</script>

<style scoped>
    .my-card {
        width: 350px;
    }

</style>
