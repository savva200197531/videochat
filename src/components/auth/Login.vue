<template>
  <div id="login">
    <nav-bar-auth/>
    <b-form class="login-form mx-auto mt-5 p-2 shadow" @submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          class="email"
          label="Email адрес:"
          label-for="email__input"
      >
        <b-form-input
            id="email"
            type="email"
            v-model.trim="$v.email.$model"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            placeholder="Введите ваш email"
        ></b-form-input>
        <small
            class="text-danger"
            v-if="$v.email.$dirty && !$v.email.required"
        >
          Поле email должно быть заполнено!
        </small>
        <small
            class="text-danger"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >
          Поле email заполнено некорректно!
        </small>
      </b-form-group>

      <b-form-group
          class="password"
          label="Пароль:"
          label-for="password__input"
      >
        <b-form-input
            v-model.trim="$v.password.$model"
            :class="{invalid:
            ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && !$v.password.minLength)}"
            id="password__input"
            type="text"
            placeholder="Введите пароль"
        ></b-form-input>
        <small
            class="text-danger"
            v-if="$v.password.$dirty && !$v.password.required"
        >
          Поле пароль должно быть заполнено! <br>
        </small>
        <small
            class="text-danger"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Поле пароль должно содержать минимум {{ $v.password.$params.minLength.min }} символов! <br>
        </small>
      </b-form-group>

      <b-button type="submit" variant="primary">Войти</b-button>
      <b-button class="ml-2" type="reset" variant="danger">Сброс</b-button>
    </b-form>
  </div>
</template>

<script>
import NavBarAuth from '@/components/general/NavBarAuth';
import { email, minLength, required } from 'vuelidate/lib/validators';

import { mapActions } from 'vuex'

export default {
  name: "Login",
  components: {
    NavBarAuth
  },
  data: () => ({
    email: 'kashin.savva@mail.ru',
    password: '123456789',
    show: true,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    ...mapActions('storage', [
        'userLogin'
    ]),
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const userInfo = {
        email: this.email,
        password: this.password
      }
      this.userLogin(userInfo)
    },
    onReset(evt) {
      evt.preventDefault()
      this.email = ''
      this.password = ''
      this.show = false
      this.$nextTick(() => {
        this.$v.$reset();
        this.show = true
      })
    },
  }
}
</script>

<style scoped>

</style>
