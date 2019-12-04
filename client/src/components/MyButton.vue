<template>
    <!--A container for our button-->
    <div class="container">
        //Our button which has a 'text' property
        <button type="submit" class="my-button" v-text="text"></button>
    </div>
</template>

<script>
export default {
  name: 'Mybutton',
  // This function gets called when the component is ready
  mounted () {
    console.log('Component mounted.')
  },

  //  Property of the component
  props: [
    'text'
  ]
}
</script>

<style scoped>
    .my-button {
        background-color: #333;
        color: #fff;
        padding: 10px 20px;
        font-weight: bold;
    }
</style>
