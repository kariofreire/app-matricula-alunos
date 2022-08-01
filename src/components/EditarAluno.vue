<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="900"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">Editar matrícula de um Aluno</v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="nome"
                :counter="20"
                :rules="nomeRules"
                label="Nome do Aluno"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="data_nascimento"
                    label="Data de nascimento"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="data_nascimento"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              <v-select
                v-model="curso_id"
                :items="dadosCursos"
                item-value="id"
                item-text="titulo"
                :rules="[v => !!v || 'Curso é obrigatório.']"
                label="Curso"
                required
              ></v-select>
            </v-form>
          </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="editar"
          >
            Cadastrar
          </v-btn>

          <v-btn
            color="error darken-1"
            text
            @click="fechar"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "EditarAluno",

    props: {
      dialog: {
        type: Boolean
      },

      dadosCursos: {
        type: Array,
        default: []
      },

      dadosAluno: {
        type: Object,
        default: {}
      }
    },

    data() {
      return {
        valid: true,
        menu: false,

        data_nascimento: "",

        nome: "",
        nomeRules: [
          v => !!v || "Nome é obrigatório.",
          v => (v && v.length <= 20) || "O nome deve ter menos de 20 caracteres.",
        ],

        email: "",
        emailRules: [
          v => !!v || "E-mail é obrigatório.",
          v => /.+@.+\..+/.test(v) || "E-mail inválido.",
        ],

        curso_id: null
      }
    },

    mounted() {
      this.alimentaCampos()
    },

    methods: {
      alimentaCampos() {
        console.log("okay");

        this.nome = this.dadosAluno?.nome,

        this.data_nascimento = new Date(this.dadosAluno?.data_nascimento).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '/'),

        this.email = this.dadosAluno?.email,
        this.curso_id = this.dadosAluno?.curso_id
      },

      editar() {
        if (this.$refs.form.validate()) {
          this.$emit("dados", { ...{
            nome: this.nome,
            email: this.email,
            data_nascimento: this.data_nascimento,
            curso_id: this.curso_id
          } });

          // this.$refs.form.reset();
          // this.$refs.form.resetValidation();

          this.$emit("fechar");
        }
      },

      fechar() {
        // this.$refs.form.reset();
        // this.$refs.form.resetValidation();
        this.$emit("dados", { ...{ } });
        this.$emit("fechar");
      }
    },
  }
</script>