<template>
  <div>
    <NavBar />

    <v-card
      class="mx-auto"
      max-width="10000"
      outlined
      dark
    >
      <v-card-text
        class="text-h6 mt-2 mb-2"
      >
        Alunos Matriculados
        <v-btn
          outlined
          rounded
          text
          @click="toogleStatusCadastrarAluno"
        >
          Novo Aluno
        </v-btn>
      </v-card-text>

      <v-card-text>
        <v-simple-table
          class="mt-5"
          dark
        >
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Nascimento</th>
              <th>Curso</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in alunos"
              :key="item.id"
            >
              <td>{{ item.nome }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.data_nascimento }}</td>
              <td>{{ item.curso.titulo }}</td>
              <td class="text-center">
                  <v-btn
                    class="mx-2"
                    fab
                    x-small
                    @click="detalhesAluno(item)"
                  >
                    <v-icon>$vuetify.icons.info</v-icon>
                  </v-btn>

                  <v-btn
                    class="mx-2"
                    fab
                    x-small
                    color="primary"
                    @click="getAluno(item.id)"
                  >
                    <v-icon>$vuetify.icons.edit</v-icon>
                  </v-btn>

                  <v-btn
                    class="mx-2"
                    fab
                    x-small
                    color="error"
                    @click="toogleStatusExcluirAluno(item.id)"
                  >
                    <v-icon>$vuetify.icons.delete</v-icon>
                  </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <DetalhesAluno
      :dadosAluno="dadosAluno"
      :dialog="statusDetalhesAluno"
      @fechar="toogleStatusDetalhesAluno"
    />

    <DeletarAluno
      :id-aluno="idAlunoDeletar"
      :dialog="statusDeletarAluno"
      @dados="getRetornoIdAlunoExcluido($event)"
      @fechar="toogleStatusExcluirAluno"
    />

    <CadastrarAluno
      :dialog="statusCadastroAluno"
      :dados-cursos="dadosCurso"
      @dados="getRetornoCadastroAluno($event)"
      @fechar="toogleStatusCadastrarAluno"
      @cadastrar="toogleStatusCadastrarAluno"
    />

    <EditarAluno 
      :dialog="statusEditarAluno"
      :dados-cursos="dadosCurso"
      :dados-aluno="dadosAluno"
      @dados="getRetornoEditaAluno($event)"
      @fechar="toogleStatusEditarAluno"
    />
  </div>
</template>

<script>
  import Cookie from 'js-cookie';
  import NavBar from '@/components/NavBar';
  import DetalhesAluno from '@/components/DetalhesAluno';
  import CadastrarAluno from '@/components/CadastrarAluno';
  import DeletarAluno from '@/components/DeletarAluno';
  import EditarAluno from '@/components/EditarAluno';
  
  export default {
    name: 'Home',

    components: {
      NavBar,
      DetalhesAluno,
      CadastrarAluno,
      DeletarAluno,
      EditarAluno
    },

    data() {
      return {
        alunos: [],
        token: Cookie.get("token"),
        dadosAluno: {},
        dadosCurso: [],
        idAlunoDeletar: null,
        idAlunoEditar: null,
        statusDetalhesAluno: false,
        statusCadastroAluno: false,
        statusDeletarAluno: false,
        statusEditarAluno: false
      }
    },

    created() {
      this.getAlunos(),
      this.getCursos()
    },

    methods: {
      getAlunos() {
        fetch(`http://localhost:8000/api/alunos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access": "application/json",
            "Authorization": `Bearer ${this.token}`
          },
        })
        .then(response => response.json())
        .then(res => {
          if ([200].includes(res.code)) {
            this.alunos = res.data.data;
          } else {
            console.log('Error: ', res);
          }
        });
      },

      getCursos() {
        fetch(`http://localhost:8000/api/cursos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access": "application/json",
            "Authorization": `Bearer ${this.token}`
          },
        })
        .then(response => response.json())
        .then(res => {
          if ([200].includes(res.code)) {
            this.dadosCurso = res.data;
          } else {
            console.log('Error: ', res);
          }
        });
      },

      getAluno(idAluno) {
        const alunoDados = fetch(`http://localhost:8000/api/alunos/${idAluno}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access": "application/json",
            "Authorization": `Bearer ${this.token}`
          },
        })
        .then(response => response.json())
        .then(res => {
          if ([200].includes(res.code)) {
            this.dadosAluno = res.data;

            this.toogleStatusEditarAluno();
          } else {
            console.log('Error: ', res);
          }
        });
      },

      detalhesAluno(aluno) {
        this.dadosAluno = aluno;
        this.statusDetalhesAluno = true;
      },

      toogleStatusDetalhesAluno() {
        this.statusDetalhesAluno = !this.statusDetalhesAluno;
      },

      getRetornoCadastroAluno(dados) {
        if ([undefined].includes(dados.nome)) return false;

        fetch(`http://localhost:8000/api/alunos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access": "application/json",
            "Authorization": `Bearer ${this.token}`
          },
          body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(res => {
          if ([200].includes(res.code)) {
            this.getAlunos();
            this.getCursos();
          } else {
            console.log('Error: ', res);
          }
        });
      },

      toogleStatusCadastrarAluno() {
        this.statusCadastroAluno = !this.statusCadastroAluno;
      },

      getRetornoIdAlunoExcluido(dados) {
        if (dados.dados === null) return false;

        fetch(`http://localhost:8000/api/alunos/${dados.dados}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access": "application/json",
            "Authorization": `Bearer ${this.token}`
          },
          body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(res => {
          if ([200].includes(res.code)) {
            this.getAlunos();
            this.getCursos();
          } else {
            console.log('Error: ', res);
          }
        });
      },

      toogleStatusExcluirAluno(idAlunoDeletar = null) {
        this.idAlunoDeletar = idAlunoDeletar;
        this.statusDeletarAluno = !this.statusDeletarAluno;
      },

      getRetornoEditaAluno(dados) {
        console.log("Editar: ", dados);
      },

      toogleStatusEditarAluno() {
        this.statusEditarAluno = !this.statusEditarAluno;
      },
    },
  }
</script>
