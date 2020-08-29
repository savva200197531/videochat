<template>
  <b-list-group class="users__list-group">
    <b-list-group-item variant="light" class="font-weight-bolder">Активные контакты</b-list-group-item>
    <b-list-group-item
        class="user text-dark"
        variant="light"
        v-for="(user, key) in usersOnline"
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
