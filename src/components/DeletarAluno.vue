<template>
  <v-dialog
    v-model="dialog"
    max-width="450"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">Deseja realmente deletar este aluno?</v-card-title>

      <v-card-text>Uma vez aprovado não poderá reverter esta ação.</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="fechar(idAluno)"
        >
          Sim
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="fechar(null)"
        >
          Não
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "DeletarAluno",

    props: {
      dialog: {
        type: Boolean
      },

      idAluno: {
        type: Number
      },
    },

    methods: {
      fechar(id) {
        this.$emit("dados", { ...{ dados: id } });
        this.$emit("fechar");
      },
    },
  }
</script>