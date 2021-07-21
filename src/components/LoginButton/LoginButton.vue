<script src="./index.js"></script>

<template>
  <div class="login-button">
    <a v-if="this.requestTokenUrl !== ''" :href="this.requestTokenUrl">Login</a>
  </div>
</template>

<style lang="scss">
  .login-button {
    a {
      background-color: #1DB954;
      padding: 18px 38px 16px 48px;
      width: 160px;
      display: block;
      font-size: 14px;
      color: #ffffff;
      text-decoration: none;
      text-align: right;
      position: relative;
      border-radius: 500px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 600;
      transition: 0.3s ease;
      letter-spacing: 2px;

      &:hover {
        background-color: #1ed760;
        transition: 0.3s ease;

      }

      &:after {
        content: '';
        height: 33px;
        width: 33px;
        position: absolute;
        background: url("../../assets/spotify.svg") center/contain no-repeat;
        filter: invert(100%);
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }


    }
  }
</style>