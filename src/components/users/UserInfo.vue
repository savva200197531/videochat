<template>
  <div id="user-info">
    <b-row class="px-2 py-2 bg-light shadow-sm" no-gutters>
      <b-col>
        <b-avatar
            href="#"
        >
        </b-avatar>
        {{ name }} {{ surname }}
      </b-col>
      <b-col class="text-right">
        <b-avatar
            href="#"
            variant="success"
            size="40px">
          <b-icon
              style="width: 20px; height: 20px"
              icon="telephone">
          </b-icon>
        </b-avatar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data: () => ({
    name: 'Igor',
    surname: 'Putin'
  })
}
</script>

<style scoped>

</style>
