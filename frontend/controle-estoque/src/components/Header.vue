<template>
  <div id="app" style="width: 100%; margin: auto">
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
            <v-tab  >
              <router-link style="color: white" to="/"> Home</router-link>
            </v-tab>

            <v-tab>
              <router-link style="color: white"  to="/produto"> Cadastrar Produto</router-link>
            </v-tab>


            <v-tab>
              <router-link style="color: white"  to="/entrada"> Entrada</router-link>

            </v-tab>

            <v-tab>
              <router-link style="color: white"  to="/saida"> Saida</router-link>
            </v-tab>
            <v-tabs-slider color="pink"></v-tabs-slider>
          </v-tabs>
        </template>
      </v-toolbar>
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: 'Header',

  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true;
  },

  methods: {},
  computed: {
    ...mapState('auth', ['user']),


  },
}
</script>
