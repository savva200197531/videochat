<template>
  <div id="users-list">
    <nav-bar-main/>
    <b-row no-gutters>
      <b-col/>
      <b-col>
        <b-list-group>
          <b-list-group-item
              class="user"
              variant="light"
              href="#"
              v-for="(user, idx) in users"
              :key="idx"
          >
            {{ user.name }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import NavBarMain from '@/components/general/NavBarMain';
import { mapState } from 'vuex'

export default {
  name: "UserList",
  components: {
    NavBarMain
  },
  computed: {
    ...mapState('storage', [
      'users'
    ])
  },
  props: {},
  data: () => ({}),
}
</script>

<style lang="sass" scoped>

</style>
