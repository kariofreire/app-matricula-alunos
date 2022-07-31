<template>
  <div>
    <v-card
      class="mx-auto my-12"
      max-width="550"
      elevation="10"
      outlined
      dark
    >
      <v-responsive :aspect-ratio="16/9">
        <v-card-text
          center
          class="text-h4 text-center mt-2 mb-2"
        >LOGIN
        </v-card-text>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              color="indigo"
              label="E-mail"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :counter="6"
              color="indigo"
              label="Senha"
              outlined
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
              block
              large
              x-large
              outlined
              color="primary"
              class="mt-5"
              @click="submit"
            >ENTRAR</v-btn>

          </v-form>
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
  import Cookie from "js-cookie";

  export default {
    name: 'Login',

    data: () => ({
      valid: true,

      showPassword: false,

      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório.',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
      ],

      password: '',
      passwordRules: [
        v => !!v || 'Senha é obrigatória.',
        v => (v && v.length < 7) || 'Senha não pode conter mais que 6 caracteres.',
      ],
    }),

    created() {
      if (Cookie.get("token")) this.$router.push('/');
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          const payload = { email: this.email, password: this.password };

          fetch(`http://localhost:8000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access": "application/json",
            },
            body: JSON.stringify(payload)
          })
          .then(response => response.json())
          .then(res => {
            if ([400].includes(res.code)) {            
              console.log("Erro de autenticação: ", res);
            } else {
              Cookie.set("token", res.access_token);
              this.$router.push('/');
            }
          });
        }
      },
    },
  }
</script>