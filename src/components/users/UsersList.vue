<template>
  <b-list-group class="users__list-group">
    <b-list-group-item variant="light" class="font-weight-bolder">Личные сообщения</b-list-group-item>
    <b-list-group-item
        class="user text-dark"
        variant="light"
        v-for="(user, key) in users"
        :href="`/${userDetails.userId}/` + key"
        :key="key"
    >
      <span>{{ user.name }}</span>
      <span
          class="user-online"
          :class="{'online': user.online}">
      </span>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters, mapState } from 'vuex';


export default {
  name: "UsersList",
  components: {},
  data: () => ({
    route: '1'
  }),
  computed: {
    ...mapGetters('storage', [
      'users',
    ]),
    ...mapState('storage', [
      'userDetails'
    ])
  },
}
</script>

<style lang="sass" scoped>
.user
  display: flex
  align-items: center
  justify-content: space-between

</style>
