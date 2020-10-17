<template>
  <div class = "register">
    <v-form
      v-model="valid"
    >
      <v-container text-xs-center>
        <v-row justify="center">
          <h1>Register</h1>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="8"
            md="3"
          >
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="email"
              :rules="rules.email"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="8"
            md="3"
          >
            <v-text-field
              name="password"
              label="Password"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
              v-model="password"
              :rules="[rules.passRequired, rules.passMin]"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row  justify="center">
          <v-col
            cols="3"
            md="3"
            v-html="error"
            class="red--text"
            justify-center
          >
            <!-- <span class="red--text" v-html="error"></span> -->
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="1"
            md="1"
          >
            <v-btn
              :disabled = "!valid"
              @click="register"
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {

  data: () => ({
    email: '',
    password: '',
    valid: false,
    error: '',
    showPass: false,
    rules: {
      passRequired: v => !!v || 'Required.',
      passMin: v => v.length >= 8 || 'Min 8 characters',
      email: [
      v => !!v || 'E-mail is required,',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    },
  }),
  methods: {
    async register () {
      try {
      const response = await AuthenticationService.register ({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>