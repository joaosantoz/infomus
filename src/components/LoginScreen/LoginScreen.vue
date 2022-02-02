<script>
import ButtonLogin from "@/components/LoginButton/LoginButton.vue";

export default {
  components: { ButtonLogin },
};
</script>

<template>
  <div class="login-screen">
    <ButtonLogin />
  </div>
</template>

<style lang="scss">
.login-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

</style>
