<template>
  <div id="options" class="mr-3">
    <b-nav-item-dropdown text="Опции" right>
      <b-dropdown-item
          href="#"
          v-for="(option, idx) in optionsArr"
          :key="idx"
      >
        <span v-if="option === 'Настройки'">
          <b-icon icon="gear"></b-icon>
        </span>
        <span v-if="option === 'Тема'">
          <b-icon icon="eye"></b-icon> <b-icon icon="eye-fill"></b-icon>
        </span>
        {{ option }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  name: "Options",
  data: () => ({}),
  props: {
    optionsArr: {
      type: Array,
      default() {
        return [ `Настройки`, 'Тема', 'Потом придумаю', 'Потом придумаю' ]
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
