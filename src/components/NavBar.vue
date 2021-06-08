<template>
  <div id="nav-bar">
    <div class="profile-image">
      <router-link to="/me">
        <img v-bind:src="user.images[0].url" alt="" />
      </router-link>
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
  position: relative;
  background: black;
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  p {
    color: #fefefe;
    font-weight: bold;
  }

  a {
    font-weight: bold;
    color: #fefefe;

    &.router-link-exact-active {
      color: #e91e63;
    }
  }
}

.profile-image {
  height: 50px;
  width: 50px;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 2;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}

@media screen and (max-width: 768px) {
  #nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    max-height: 30px;
  }

  .profile-image {
    position: fixed;
  }
}
</style>