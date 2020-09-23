<template>
  <b-list-group class="users__list-group">
    <b-list-group-item variant="light" class="font-weight-bolder">Активные контакты</b-list-group-item>
    <b-list-group-item
        class="user text-dark"
        variant="light"
        v-for="(user, key) in usersOnline"
        :href="'/chat/' + userDetails.userId + '/' + key"
        :key="key"
    >
      {{ user.name }}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "UsersOnline",
  computed: {
    ...mapGetters('storage', [
      'usersOnline'
    ]),
    ...mapState('storage', [
      'userDetails'
    ])
  },
}
</script>

<style lang="sass" scoped>

</style>
