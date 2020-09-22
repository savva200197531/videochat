<template>
  <div id="register">
    <nav-bar-auth/>
    <b-form class="login-form mx-auto mt-5 p-2 shadow" @submit.prevent="onSubmit" @reset="onReset" v-if="show">

      <b-form-group class="name" label="Ваше имя:" label-for="name__input">
        <b-form-input
            id="name__input"
            v-model.trim="$v.name.$model"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength) || ($v.name.$dirty && !$v.name.maxLength)}"
            placeholder="Имя"
        ></b-form-input>
        <small
            class="text-danger"
            v-if="$v.name.$dirty && !$v.name.required"
        >
          Поле имя должно быть заполнено!
        </small>
        <small
            class="text-danger"
            v-else-if="$v.name.$dirty && !$v.name.minLength"
        >
          Поле имя должно содержать более {{ $v.name.$params.minLength.min }} символов!
        </small>
        <small
            class="text-danger"
            v-else-if="$v.name.$dirty && !$v.name.maxLength"
        >
          Поле имя должно содержать менее {{ $v.name.$params.maxLength.max }} символов!
        </small>
      </b-form-group>

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
            placeholder="Придумайте пароль"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          class="password"
          label-for="password__input"
      >
        <b-form-input
            class="password-repeat__input"
            v-model="$v.passwordRepeat.$model"
            :class="{invalid:
            ($v.passwordRepeat.$dirty && !$v.passwordRepeat.required) ||
            ($v.passwordRepeat.$dirty && !$v.passwordRepeat.minLength)} ||
            ($v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAs)"
            placeholder="Повторите пароль"
            type="text"
        ></b-form-input>
        <small
            class="text-danger"
            v-if="$v.password.$dirty && !$v.password.required || $v.passwordRepeat.$dirty && !$v.passwordRepeat.required"
        >
          Поле пароль должно быть заполнено! <br>
        </small>
        <small
            class="text-danger"
            v-else-if="$v.password.$dirty && !$v.password.minLength || $v.passwordRepeat.$dirty && !$v.passwordRepeat.minLength"
        >
          Поле пароль должно содержать минимум {{ $v.password.$params.minLength.min }} символов! <br>
        </small>
        <small
            class="text-danger"
            v-if="$v.passwordRepeat.$dirty && !$v.passwordRepeat.sameAs"
        >
          Пароли должны совпадать! <br>
        </small>
        <small class="text-black-50">
          Ваш пароль должен состоять из более чем {{ $v.password.$params.minLength.min }} символов, содержать буквы и
          цифры и не должен
          содержать пробелы, специальные символы или эмодзи
        </small>
      </b-form-group>

      <b-button type="submit" variant="primary">Зарегистрироваться</b-button>
      <b-button type="reset" variant="danger" class="ml-2">Сброс</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'
import NavBarAuth from '@/components/general/NavBarAuth';

export default {
  name: 'Register',
  components: {
    NavBarAuth
  },
  data: () => ({
    name: 'Savva',
    email: 'kashin.savva@mail.ru',
    password: '123456789',
    passwordRepeat: '123456789',
    show: true,
  }),
  validations: {
    name: { required, minLength: minLength(5), maxLength: maxLength(20) },
    email: { email, required },
    password: { required, minLength: minLength(8) },
    passwordRepeat: { required, minLength: minLength(8), sameAs: sameAs('password') }
  },
  methods: {
    ...mapActions('storage', [
      'userRegister'
    ]),
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const userInfo = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.userRegister(userInfo)
      this.$router.push('/')
    },
    onReset(evt) {
      evt.preventDefault()
      this.email = ''
      this.name = ''
      this.password = '';
      this.passwordRepeat = '';
      this.show = false
      this.$nextTick(() => {
        this.$v.$reset();
        this.show = true
      })
    },
  }
}
</script>

<style lang="sass">
.login-form
  width: 500px
  border-radius: 5px
</style>
