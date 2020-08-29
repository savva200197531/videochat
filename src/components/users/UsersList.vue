<template>
  <b-list-group class="users__list-group">
    <b-list-group-item variant="light" class="font-weight-bolder">Личные сообщения</b-list-group-item>
    <b-list-group-item
        class="user text-dark"
        variant="light"
        v-for="(user, key) in users"
        :href="'/user/' + key"
        :key="key"
    >
      {{ user.name }}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "UsersList",
  data: () => ({
    route: '1'
  }),
  computed: {
    ...mapGetters('storage', [
      'users'
    ])
  },
}
</script>

<style lang="sass">
.users__list-group
  border-radius: 0
  height: calc(100vh - 90px)
  overflow-y: auto
</style>
