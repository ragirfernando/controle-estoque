<template>
  <div id="app" style="width: 95%; margin: auto">
    <v-app id="inspire">
      <br/>
      <Header/>
      <v-card id="lateral">
        <v-data-table :headers="nomeColunas" :items="produtos" :search="search">
          <template v-slot:top>
            <v-toolbar flat color="#">
              <v-toolbar-title>Produtos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-card-title style="width: 85%">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Filtrar"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn style="margin-left: 2%" @click="mostrarDialoFormularios">Novo Produto</v-btn>
              </v-card-title>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialogFormularios" max-width="95%">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ novoOuAtualizar }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form
                          ref="form"
                          v-model="valid"
                          :lazy-validation="lazy"
                      >
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="produto.nome"
                                label="Descriçao *"
                                :rules="[v => !!v || 'Campo obrigatório']"
                            ></v-text-field>
                          </v-col>


                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                type="number"
                                v-money="{ precision: 4 }"
                                v-model="produto.preco"
                                label="Preço *"
                                :rules="[v => !!v || 'Campo obrigatório']"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                type="number"
                                v-model="produto.quantidade"
                                label="Quantidade *"
                                :rules="[v => !!v || 'Campo obrigatório']"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white" text @click="dialogFormularios = false">Cancelar</v-btn>
                    <v-btn color="white" text :disabled="!valid" @click="inserirProduto">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.acoes="{item}">
            <v-icon
                small
                class="mr-2"
                @click="atualizarVeiculo(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-card-subtitle>Nenhum veículo para ser mostrado.</v-card-subtitle>
          </template>
        </v-data-table>

        <router-view/>

      </v-card>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
import {token, url} from "@/components/config/url";
import {mdiCursorDefaultClick} from '@mdi/js';
import Header from "./Header";

export default {
  name: "App",
  components: {
    Header
  },
  data: () => ({
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
    this.$vuetify.theme.dark = true;
    this.listarProdutos();
  },
  methods: {
    inserirProduto() {
      if (this.produto.id == null) {
        axios.post(url + "produtos/cadastrar", this.produto, {headers: {Authorization: token}}).then(response => {
          this.produtos = response.data;
        }).catch((error) => {
          console.log(error)
        })
      } else {
        axios.put(url + "produtos/atualizar", this.produto, {headers: {Authorization: token}}).then(response => {
          this.produtos = response.data;

        }).catch((error) => {
          console.log(error)
        })
      }
      this.dialogFormularios = false;
      this.listarProdutos();
    },
    atualizarVeiculo(item) {
      this.novoOuAtualizar = "Atualizar produto"
      this.produto = Object.assign({}, item);
      this.dialogFormularios = true;
    },
    listarProdutos() {
      axios.get(url + "produtos/produtos", {headers: {Authorization: token}}).then(response => {
        this.produtos = response.data;
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },

    mostrarDialoFormularios() {
      axios.get(url + "categoria", {headers: {Authorization: token}}).then(response => {
        this.categorias = response.data;
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
      this.dialogFormularios = true;
      this.novoOuAtualizar = "Inserir novo produto";
      this.reset();
    },
    reset() {
      this.$refs.form.reset()
    },
  }
};
</script>

