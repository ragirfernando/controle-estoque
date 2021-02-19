<template>
  <div id="app" style="width: 95%; margin: auto">
    <v-app id="inspire">
      <br/>
      <Header/>
      <v-card id="lateral">
        <router-view></router-view>
        <v-card>
          <v-card-title>
            Listas das movimentações
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
import Header from "./Header";

export default {
  name: 'Home',

  components: {
    Header
  },

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
    this.$vuetify.theme.dark = true;
    this.buscarMovimentacao();
  },

  methods: {
    buscarMovimentacao() {
      let lista = []
      axios.get(url + "movimentacao/movimentacoes",
          {headers: {Authorization: token}})
          .then(response => {
            response.data.forEach(mov => {
              mov.data_hora = this.formatarData(mov.data_hora)
              lista.push(mov)
            })
            this.listaMovimentacoes = lista;
          })
          .catch((error) => {
            console.log(error)
          })
    },
    formatarData(date) {
      /*alert(date)*/
      const dataTime = date.slice(0,10);
      const data = dataTime.split("-")
      const dataFormatada = data[2] + "/" + data[1] + "/" + data[0]

      return dataFormatada;
    },

  },

  computed: {
    ...mapState('auth', ['user']),


  },
}
</script>
