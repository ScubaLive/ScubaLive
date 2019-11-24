<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register to save your dive plans!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        ref="email"
        lazy-rules
        class="col"
        label="Email"
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || 'Please enter at east 6 characters.']"
        ref="password"
        lazy-rules
        type="password"
        class="col"
        label="Password"
        stack-label />
    </div>
    <div class="row">
      <q-space />
      <q-btn
        color="primary"
        label="Register"
        type="submit" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        console.log('register user')
      }
    },
    isValidEmailAddress (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style scoped>

</style>
