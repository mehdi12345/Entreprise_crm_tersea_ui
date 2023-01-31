<script>
import { mapState } from "vuex";

/**
 * Vertical layout
 */
export default {
  name: "vertical",
  mounted() {
    document.body.removeAttribute("data-layout");
    document.body.removeAttribute("data-topbar");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    
  },
  data() {
    return {};
  },
  computed: mapState(["layout"]),
};
</script>

<template>
  <div id="layout-wrapper">
    <Sidebar :type="this.layout.leftSidebarType" :width="this.layout.layoutWidth"  />
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <Nuxt />
        </div>
    </div>
    </div>
  </div>
</template>
<style>
.main-content{
  margin-left: 250px;
  background-color: rgb(245,246,248)

}
.page-content{
  padding: 10px 0 60px;

}
.container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl{
      width: 100%;
    padding-right: .625rem;
    padding-right: var(--bs-gutter-x,.625rem);
    padding-left: .625rem;
    padding-left: var(--bs-gutter-x,.625rem);
    margin-right: auto;
    margin-left: auto;
}
.card{
  margin-bottom: 1.25rem;
    box-shadow: 0 2px 4px rgba(15,34,58,.12);
}

</style>
