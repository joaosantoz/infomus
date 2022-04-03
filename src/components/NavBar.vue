<script lang=ts setup>
// import { useMoonLightStore } from "@/stores/store";
// import { computed } from "@vue/reactivity";

// const store = useMoonLightStore();

// const getUserPicture = computed(() => store.getUserPicture);

</script>

<template>
	<div id="nav-bar">
		<!-- <div class="profile-image">
			<router-link to="/me">
				<img v-if="getUserPicture" :src="getUserPicture" />
				<img v-else src="../../assets/profile-placeholder.png" />
			</router-link>
		</div> -->
		<div id="nav">
			<router-link to="/home">Home</router-link>
			<!-- <router-link to="/releases">Lançamentos</router-link>
			<router-link to="/topsongs">Top Músicas</router-link> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
#nav-bar {
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 50;

  #nav {
    position: relative;
    background: black;
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    p {
      color: #ffffff;
      font-weight: bold;
    }

    a {
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      text-decoration: none;

      &.router-link-exact-active {
        color: #e91e63;
      }
    }
  }

  .profile-image {
    height: 45px;
    width: 45px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      border: #e91e63 solid 3px;
    }
  }

  @media screen and (max-width: 768px) {
    #nav {
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      max-height: 50px;
    }

    .profile-image {
      position: fixed;
      top: 5%;
    }
  }
}
</style>
