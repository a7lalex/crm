<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{'HomeAccounting' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">{{'Email' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'message_EmailInvalid' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'message_EmailRequired' | localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'Password' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'message_PasswordRequired' | localize}}</small>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >{{'message_PasswordMust' | localize}} {{$v.password.$params.minLength.min}} {{'message_PasswordSymbols' | localize}} {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        >
        <label for="name">{{'Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'message_EnterName' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.name.$dirty && !$v.name.minLength"
        >{{'message_MustName' | localize}} {{$v.password.$params.minLength.min}} {{'message_PasswordSymbols' | localize}} {{name.length}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox"
            v-model="agree"
          />
          <span>{{'message_AgreeRules' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="!agree"
        >
          {{'Register' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'message_HaveAccount' | localize}}
        <router-link to="/login">{{'Login' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";

  export default {
    name: 'Register',
    metaInfo() {
      return {
        title: this.$title('Register')
      }
    },
    data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
    }),
    validations: {
      email: {email, required},
      password: {required,minLength: minLength(6)},
      name: {required,minLength: minLength(3)},
      agree: {checked: v => v}
    },
    methods: {
      async onSubmit() {
        if(this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register',formData)
          await this.$router.push('/')
          // eslint-disable-next-line no-empty
        } catch (e) {}

      }
    }
  }
</script>
