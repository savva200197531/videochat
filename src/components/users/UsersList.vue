<template>
  <div id="users-list">
    <b-list-group class="users__list-group">
      <b-list-group-item
          class="user text-dark"
          variant="light"
          href="#"
          v-for="(user, idx) in users"
          :key="idx"
      >
        {{ user.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "UsersList",
  computed: {
    ...mapState('storage', [
      'users'
    ])
  },
}
</script>

<style lang="sass" scoped>
.users__list-group
  border-radius: 0
  height: calc(100vh - 90px)
  overflow-y: auto


</style>
