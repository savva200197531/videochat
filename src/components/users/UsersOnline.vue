<template>
  <b-col id="users-online" class="users-online shadow-sm">
    <b-list-group class="users__list-group">
      <b-list-group-item variant="light" class="font-weight-bolder">Активные контакты</b-list-group-item>
      <b-list-group-item
          class="user text-dark"
          variant="light"
          href="#"
          v-for="(user, idx) in usersOnline"
          :key="idx"
      >
        {{ user.name }}
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "UsersOnline",
  computed: {
    ...mapGetters('storage', [
      'usersOnline'
    ])
  },
}
</script>

<style lang="sass" scoped>

</style>
