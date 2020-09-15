<template>
  <div id="language" class="mr-2">
    <b-nav-item-dropdown text="Язык" right>
      <b-dropdown-item
          href="#"
          v-for="(lang, idx) in langArray"
          :key="idx"
      >
        {{ lang }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  name: "Language",
  props: {},
  data: () => ({
    langArray: ['En', 'Ru', 'Es', 'Fa']
  })
}
</script>

<style scoped>

</style>
