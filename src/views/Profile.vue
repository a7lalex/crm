<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid">{{'message_EnterName' | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="locale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {required} from "vuelidate/lib/validators";
  import localizeFilter from "../filters/localize.filter";
export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data() {
    return {
      name: '',
      locale: false
    }
  },
  validations: {
    name: {required},
  },
  mounted() {
    this.name = this.info.name
    this.locale = this.info.locale === 'ru-RU'
    setTimeout(()=>{
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.locale ? 'ru-RU' : 'en-US'
        })
        this.$message(localizeFilter('message_LocalizeEdit'))
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
}
</script>
