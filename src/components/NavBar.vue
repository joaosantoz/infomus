<template>
  <div id="nav-bar">
    <div class="profile-image">
      <img v-bind:src="user.images[0].url" alt="" />
    </div>
    <div id="nav">
      <router-link to="/releases">Lançamentos</router-link>
      <router-link to="/topsongs">Top Músicas</router-link>
    </div>
  </div>
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
  padding: 20px 0;
  text-align: center;
  background: #000000;
  position: relative;

  a {
    font-weight: bold;
    color: #fefefe;

    &.router-link-exact-active {
      color: #e91e63;
    }
  }
}

@media screen and (max-width: 768px) {
  #nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .profile-image {
    height: 50px;
    width: 50px;
    position: fixed;
    right: 15px;
    top: 15px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>