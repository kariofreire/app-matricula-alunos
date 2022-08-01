<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="650"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">Detalhes do Aluno</v-card-title>

        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              alt="Aluno"
              class="elevation-4"
              :src="require('@/assets/aluno.png')"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ dadosAluno.nome }}</v-list-item-title>

            <v-spacer></v-spacer>

            <v-list-item-subtitle>
              {{ dadosAluno.data_nascimento + ` - ` + dadosAluno.email }}
            </v-list-item-subtitle>

            <v-spacer></v-spacer>

            <v-list-item-subtitle class="text--primary">
              {{ dadosAluno?.curso?.titulo + ` - ` + dadosAluno?.curso?.descricao }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="fechar"
          >
            FECHAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DetalhesAluno",

  props: {
    dialog: {
      type: Boolean
    },

    dadosAluno: {
      type: Object,
      default: {
        nome: "",
        email: "",
        data_nascimento: "",
        curso: {
          titulo: "",
          descricao: ""
        }
      }
    }
  },

  methods: {
    fechar() {
      this.$emit("dados", { ...{ data: this.dadosAluno } });
      this.$emit("fechar");
    },
  },
}
</script>