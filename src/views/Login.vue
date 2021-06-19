<template>
  <div class="login">
    <LoginScreen />
  </div>
</template>

<script>
import LoginScreen from "@/components/LoginScreen/LoginScreen.vue";

export default {
  components: {
    LoginScreen,
  },
};
</script>

<style lang="scss">
.login {
  background: url(../assets/login-bkg.jpg) no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>
