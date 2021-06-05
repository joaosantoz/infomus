<template>
  <div class="login-screen">
    <ButtonLogin />
  </div>
</template>

<script>
import ButtonLogin from "./ButtonLogin.vue";

export default {
  components: { ButtonLogin },
};
</script>

<style scoped lang="scss">
.login-screen {
  height: 500px;
  width: 350px;
  background: #212121;
  margin: 0 auto;
}
</style>