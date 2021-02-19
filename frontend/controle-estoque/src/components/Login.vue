<template>
  <form @submit.prevent="onSubmit()">
    <fieldset>
      <label>E-Mail</label>
      <input v-model="login.email" type="email">
    </fieldset>

    <fieldset>
      <label>Senha</label>
      <input v-model="login.senha" type="password">
    </fieldset>


    <button type="submit">Entrar</button>
    <router-view></router-view>
  </form>
</template>

<script>
import { signIn } from '../components/config/auth';
export default {
  name: 'login',
  data:() => ({
    login: {
      email: "fernando@gmail.com",
      senha: "123456"
    }
  }),

  methods: {
    async onSubmit () {
      const response =  await signIn(this.login);

      if (response) {
        await this.$router.push('/home');
      }
    }
  }
};
</script>
