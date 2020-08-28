<template>
  <div id="text-field">
    <b-row
        class="text-field"
        no-gutters>
      <b-col>
        <b-textarea
            no-resize
            rows="4"
            class="textarea"
        >
        </b-textarea>
      </b-col>
      <b-col cols="2" class="ml-2">
        <b-button
            variant="primary"
            class="send-btn"
        >
          Отправить
        </b-button>
        <b-button class="ml-1 bg-transparent border-secondary">
          <b-icon icon="emoji-smile" variant="secondary"></b-icon>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
name: "TextField"
}
</script>

<style lang="sass" scoped>
//.textarea
//  border-bottom-right-radius: 0
//  border-bottom-left-radius: 0
//  border-bottom: 0
//  border-left: 0
</style>
