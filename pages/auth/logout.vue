<template>
  <section>
    <div class="container">
      <div class="loader"></div>
      <p>Logout...</p>
    </div>
  </section>
</template>

<script>
export default {
  //middleware: ["guest"],
  async mounted() {
    this.$auth.$storage.removeCookie("loggedIn", true);
    this.$auth.$storage.removeCookie("user", true);
    await this.$auth.logout();
    setTimeout(() => this.$router.push("/"), 500);
  },
};
</script>

<style  scoped>
.container {
  height: 100vh;
  text-align: center;
}
.loader {
  margin: 20px auto;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #ff6600;
  border-bottom: 8px solid #ff6600;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 1.2s linear infinite;
  animation: spin 1.2s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>