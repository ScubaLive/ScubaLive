<template>
    <div>
        <q-btn color="primary" icon-right="description" label="Note" size="lg" @click="notesModal = true"/>
        <q-dialog v-model="notesModal">
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
                            v-model="date"
                            label="Date"
                        />
                        <q-input
                            filled
                            type="text"
                            v-model="location"
                            label="Location"
                        />
                        <q-input
                          filled
                          type="textarea"
                          v-model="notes"
                          label="Notes"
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
      notesModal: false,
      date: null,
      location: null,
      notes: null
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Note Saved',
        position: 'top'
      })
    },

    onReset () {
      this.date = null
      this.location = null
      this.notes = null
    }
  }
}
</script>

<style scoped>
    .my-card {
        width: 350px;
    }

</style>
