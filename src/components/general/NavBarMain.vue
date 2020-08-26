<template>
  <div id="nav-bar-main">
    <b-navbar toggleable type="light" variant="light">
      <b-navbar-brand href="#">
        <b-img class="vue-logo" src="https://www.futuretech.res.in/wp-content/uploads/2019/05/2000px-Vue.js_Logo_2.svg_.png" width="30px"/>
        <span>ideo Chat</span>
      </b-navbar-brand>
      <logout/>
      <b-navbar-toggle target="navbar-toggle-collapse" class="button ml-2">
        <template v-slot:default="{ expanded }">
          <b-icon class="menu-icon" v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon class="menu-icon" v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>
      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">
            <b-icon icon="gear"></b-icon> Настройки
          </b-nav-item>
          <b-nav-item href="#">
            <b-icon icon="eye"></b-icon> <b-icon icon="eye-fill"></b-icon> Тема
          </b-nav-item>
          <b-nav-item href="#">
            Потом придумаю
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Logout from '@/components/auth/Logout';

export default {
  name: "NavBarMain",
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

.button
  height: 38px
</style>
