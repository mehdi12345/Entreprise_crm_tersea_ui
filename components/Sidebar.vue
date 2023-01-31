<script>

import { mapState } from "vuex";


export default {
  data() {
    return {
      admin:this.$auth.$storage.getCookie('user')['is_admin'],
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: mapState(["layout"]),
  methods: {
    
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
  },
};
</script>

<template>
  <div class="vertical-menu" >
    <div class="navbar-brand-box">
      <nuxt-link to="/" class="logo logo-light nuxt-link-exact-active nuxt-link-active">
          
          <img src="~/assets/images/tersea.jpg" alt height="150" />
      </nuxt-link>
    </div>

    <button
      type="button"
      @click="toggleMenu"
      class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
    >
      <i class="fa fa-fw fa-bars"></i>
    </button>

    <div data-simplebar class="sidebar-menu-scroll">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="menu-title">pages</li>
          <li>
            <NuxtLink to="/" class="side-nav-link-ref">
              <i class="uil-user-circle"></i>
              <span>Profile</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/Administrators/" class="side-nav-link-ref" v-if="admin">
              <i class="fas fa-ad"></i>
              <span>Administrators</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/company/" class="side-nav-link-ref" v-if="admin==false">
              <i class="fas fa-ad"></i>
              <span>Company</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/Employee/" class="side-nav-link-ref" v-if="admin==false">
              <i class="fas fa-ad"></i>
              <span>Employees</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/companies/" class="side-nav-link-ref"  v-if="admin">
              <i class="fas fa-building"></i>
              <span>Companies</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/Employees/" class="side-nav-link-ref"  v-if="admin">
              <i class="fas fa-user"></i>
              <span>Employees</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/Invitations" class="side-nav-link-ref"  v-if="admin">
              <i class="fas fa-bell"></i>
              <span>Invitations</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/Historiques" class="side-nav-link-ref"  v-if="admin">
              <i class="fa fa-history"></i>
              <span>Historiques</span>
            </NuxtLink>
          </li>
          <li class="menu-title">
            authentication
          </li>
          <li>
            <NuxtLink to="/auth/logout" class="side-nav-link-ref"
              ><i class="fas fa-sign-out-alt"></i>
              <span>logout</span>
              </NuxtLink
            >
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
@import url("https://unicons.iconscout.com/release/v3.0.0/css/line.css");
body{
  overflow-x: hidden;
}
.menu-title{
  padding: 12px 20px!important;
    letter-spacing: .05em;
    pointer-events: none;
    cursor: default;
    font-size: 11px;
    text-transform: uppercase;
    color: #7b8190;
    font-weight: 600;
}
#sidebar-menu{
  margin-top: -50px;
}
#sidebar-menu ul li a{
  display: block;
    padding: .6rem 1.1rem;
    color: #7b8190;
    position: relative;
    font-size: 15px;
    font-weight: 500;
    transition: all .4s;
    margin: 0 10px;
    border-radius: 3px;
}
.vertical-menu{
  width: 250px;
    z-index: 1005;
    background: #fff;
    bottom: 0;
    margin-top: 0;
    position: fixed;
    top: 0;
    box-shadow: 0 2px 4px rgba(15,34,58,.12);
}
#vertical-menu{
  padding: 10px 0 30px;

}
#sidebar-menu ul li a i{
  display: inline-block;
    min-width: 1.5rem;
    padding-bottom: .125em;
    font-size: 1.05rem;
    line-height: 1.40625rem;
    vertical-align: middle;
    color: #7b8190;
    transition: all .4s;
}
.navbar-brand-box{
      padding: 0 1.5rem;
      width: 250px;

}
.logo{
  line-height: 70px;
display: block;
}
@media only screen and (min-width: 991px) {
  .fa-fw{
    display: none;
  }
}
.font-size-16{
  font-size: 16px;
}
</style>