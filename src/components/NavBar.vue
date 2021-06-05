<template>
  <div id="nav">
    <router-link to="/releases">Lançamentos</router-link> |
    <router-link to="/topsongs">Top Músicas</router-link>
  </div>
  <p v-if="userIsAuth && user">Bem-vindo(a) {{ user.display_name }}!</p>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userIsAuth", "user"]),
  },
};
</script>

<style scoped lang="scss">
#nav {
  padding: 20px;
  text-align: center;
  background: #fefefe;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
p {
  text-align: center;
}
</style>