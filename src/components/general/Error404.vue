<template>
  <div id="404">
    <h1>error 404</h1>
    <router-link :to="'/'">Вернуться на главную страницу</router-link>
  </div>
</template>

<script>
export default {
name: "Error404"
}
</script>

<style scoped lang="sass">
@import '~bootstrap/scss/bootstrap.scss'

h1
  color: $danger
  font-size: 60px
</style>
