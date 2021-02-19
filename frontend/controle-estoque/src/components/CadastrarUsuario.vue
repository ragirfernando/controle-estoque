<template>
  <div id="app" style="width: 95%; margin: auto">
    <br/>
    <v-card id="lateral">
      <v-app style="width: 95%; margin: auto" id="inspire">
        <v-form
            style="width: 95%; margin: auto"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
        >
          <v-text-field
              v-model="usuario.nome"
              :rules="nameRules"
              label="Nome"
              required
          ></v-text-field>

          <v-text-field
              v-model="usuario.email"
              :rules="emailRules"
              label="E-mail"
              required
          ></v-text-field>

          <v-text-field
              v-model="usuario.senha"
              type="password"
              label="Senha"
              :rules="[v => !!v || 'Campo obrigatório']"
              required
          ></v-text-field>

          <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="inserirVeiculo"
          >
            Cadastrar
          </v-btn>
        </v-form>
      </v-app>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import {url} from "@/components/config/url";
import {mdiCursorDefaultClick} from '@mdi/js';
// import Header from "./Header";


export default {
  name: "App",
  /*components: {
    Header
  },*/
  data: () => ({
    usuario: {
      nome: "",
      email: "",
      senha: ""
    },
    nameRules: [
      v => !!v || 'Nome é obrigadorio'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
    ],

    novaQuantidade: null,
    valid: true,
    lazy: false,
    categorias: [],
    iconClick: mdiCursorDefaultClick,
    dialogFormularios: false,
    dialogDeletarVeiculo: false,
    novoOuAtualizar: "",
    search: "",
    produtos: [],
    produto: {
      id: "",
      nome: "",
      preco: null,
      quantidade: null,


    },
    nomeColunas: [
      {text: "ID", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "id"},
      {text: "Descrição", sortable: false, class: "subtitle-2 Bold text", value: "nome"},
      {text: "Preço", class: "subtitle-2 Bold text", sortable: false, value: "preco"},
      {text: "Quantidade", sortable: false, class: "subtitle-2 Bold text", value: "quantidade"},
      {text: "Ações", value: "acoes", class: "subtitle-2 Bold text", sortable: false}
    ],
  }),
  created() {
    //this.$vuetify.theme.dark = true;
    this.buscarMovimentacao();
  },
  methods: {
    inserirVeiculo() {
      axios.post(url + "usuarios/cadastro", this.usuario, /*{headers: {Authorization: token}}*/).then(response => {
        console.log(response.data);
        this.$router.push('/login');
      }).catch((error) => {
        console.log(error)
      })

      this.buscarMovimentacao();
      this.dialogFormularios = false;
    },
    reset() {
      this.$refs.form.reset()
    },
  }
};
</script>

