<template>
  <div id="app" style="width: 95%; margin: auto">
    <v-app id="inspire">
      <br/>
      <v-card id="lateral">
        <v-toolbar
            dark
            tabs
            flat
            color="indigo"
        >


          <template v-slot:extension>
            <v-tabs
                v-model="tabs"
                align-with-title
            >
              <v-tab>
                <router-link to="/produto"> Cadastrar Produto</router-link>

              </v-tab>

              <v-tab href="#three">
                Cadastrar Categoria
              </v-tab>

              <v-tab href="#two">
                Entrada
              </v-tab>

              <v-tab href="#three">
                Saida
              </v-tab>
              <v-tabs-slider color="pink"></v-tabs-slider>
            </v-tabs>
          </template>
        </v-toolbar>
        <router-view></router-view>
        <br/><br/><br/>

        <v-card>
          <v-card-title>
            <!--            Nutrition-->
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="listaMovimentacoes"
              :search="search"
          ></v-data-table>
        </v-card>


      </v-card>
    </v-app>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios';
import {url, token} from './config/url';

export default {
  name: 'Home',

  data: () => ({
    search: '',
    listaMovimentacoes: [],
    veiculo: {
      id: null,
      data_hora: "",
      usuario: "",
      produto: "",
      tipo: "",
      quantidade_old: "",
      quantidade_new: "",
    },
    headers: [
      {text: "ID", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "id"},
      {text: "Data", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "data_hora"},
      {text: "Usuário", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "usuario"},
      {text: "Produto", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "produto"},
      {text: "Operação", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "tipo"},
      {text: "Old", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "quantidade_old"},
      {text: "New", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "quantidade_new"},
    ],

  }),
  created() {
    //this.$vuetify.theme.dark = true;
    this.buscarMovimentacao();
  },

  methods: {
    buscarMovimentacao() {
      axios.get(url+"movimentacao/movimentacoes",
          {headers: {Authorization: token}})
          .then(response => {
            this.listaMovimentacoes = response.data;
          })
          .catch((error) => {
            console.log(error)
          })
    }
  },
  computed: {
    ...mapState('auth', ['user']),


  },
}
</script>
