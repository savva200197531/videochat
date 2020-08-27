<template>
  <div id="nav-bar-main">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">
        <b-img class="vue-logo" src="https://www.futuretech.res.in/wp-content/uploads/2019/05/2000px-Vue.js_Logo_2.svg_.png" width="30px"/>
        <span>ideo Chat</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Аккаунт</b-nav-item>
          <b-nav-item href="#">Потом придумаю</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <language/>

          <options/>

          <logout/>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Logout from '@/components/auth/Logout';
import Language from '@/components/general/Language';
import Options from '@/components/general/Options';

export default {
  name: "NavBarMain",
  components: {
    Logout,
    Language,
    Options
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

.button
  height: 38px
</style>
