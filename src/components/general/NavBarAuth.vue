<template>
  <div id="nav-bar-auth">
    <b-navbar type="light" variant="light" class="align-items-center">
      <b-navbar-brand href="#">
        <b-img class="vue-logo" src="https://www.futuretech.res.in/wp-content/uploads/2019/05/2000px-Vue.js_Logo_2.svg_.png" width="30px"/>
        <span>ideo Chat</span>
      </b-navbar-brand>
      <logout/>
      <b-button @click="goRegister" v-if="this.$router.currentRoute.name === 'Login'" class="ml-auto bg-primary">Регистрация</b-button>
      <b-button @click="goLogin" v-else class="ml-auto bg-primary">Войти</b-button>
    </b-navbar>
  </div>
</template>

<script>
import Logout from '@/components/auth/Logout';

export default {
  name: "NavBarAuth",
  components: {
    Logout
  },
  props: {
    langArray: {
      type: Array,
      default() {
        return [ 'EN', 'ES', 'RU', 'FA' ]
      }
    }
  },
  data: () => ({}),
  methods: {
    goRegister() {
      this.$router.push('/register')
    },
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass" scoped>
.vue-logo
  margin-top: -10px
</style>
