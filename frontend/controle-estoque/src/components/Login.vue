<template>
  <v-container>
    <div id="app">
      <v-alert
          v-model="alertInfo"
          type="error"
          close-text="Close Alert"
          dismissible>
        {{ mensagemInfo }}
      </v-alert>
        <div class="login-page">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <div class="form-group">
                <input
                    required
                    type="email"
                    v-model="login.email"
                    class="form-control"
                    placeholder="E-mail"
                />
              </div>
              <div class="form-group">
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    class="form-control"
                    v-model="login.senha"
                />
              </div>
              <div class="form-group">
                <button @click="onSubmit" class="btn btn-primary w-100">Entrar</button>
              </div>
              <button @click="cadastrarUsuario" class="btn btn-primary w-100">Cadastrar</button>
            </div>
          </div>
        </div>
    </div>
  </v-container>
</template>

<script>
import {signIn} from '../components/config/auth';

export default {
  name: 'login',
  data: () => ({
    alertInfo: false,
    mensagemInfo: "",
    login: {
      email: "roberto@gmail.com",
      senha: "12345"
    }
  }),

  methods: {
    async cadastrarUsuario(){
      await this.$router.push('/cadastroUsuario');
    },
    async onSubmit() {
      const response = await signIn(this.login);
      console.log("response "+response)
      if (response) {
        await this.$router.push('/');
      }else {
        this.alertInfo = true
        this.mensagemInfo = "Email ou senha estão incorretos!"
      }
    }
  }
};
</script>
<style scoped lang="scss">
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    width: 40%;
  }
}
</style>
