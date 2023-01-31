<script>
export default {
  data() {
    return {
      languages: [
        {
          // flag: require("~/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          // flag: require("~/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          // flag: require("~/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      text: null,
      flag: null,
      value: null,
    };
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },

    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    async logout() {
      this.$auth.$storage.removeCookie("loggedIn", true);
      this.$auth.$storage.removeCookie("user", true);
      await this.$auth.logout();
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <nuxt-link to="/" class="logo logo-dark">
            <span class="logo-sm">
            </span>
            <span class="logo-lg">
            </span>
          </nuxt-link>

          <nuxt-link to="/" class="logo logo-light">
            <span class="logo-sm">
            </span>
            <span class="logo-lg">
            </span>
          </nuxt-link>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <NuxtLink to="/" class="side-nav-link-ref">
          <b-button variant="primary" class="mx-2">
            <i class="fas fa-home mx-1"></i>
            <span class="d-inline-none d-lg-block">Accueil</span>
          </b-button>
        </NuxtLink>
        <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{ text }}
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :link-class="{ active: entry.language === current_language }"
          >
            <img
              :src="`${entry.flag}`"
              alt="user-image"
              class="me-1"
              height="12"
            />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>

        <div class="user">
          
          <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{{
            $auth.$storage.getCookie("user")
              ? $auth.$storage.getCookie("user").name
                ? $auth.$storage.getCookie("user").name
                : ""
              : ""
          }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.btn-primary {
  background-color: #f60;
  border-color: #f60;
  font-size: 16px;
  border-radius: 6px;

}
.btn-primary:hover,.btn-primary:focus {
  transform: scale(1.02, 1.02);background-color: #f60;
  border-color: #f60;
    color: white;
}
@media only screen and (min-width: 991px) {
  .user{
    margin-top:15px
  }
}
</style>
