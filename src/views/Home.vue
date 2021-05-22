<template>
  <div id="page-top">
  <div id="wrapper">
    <NavLeft/>
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content" style="filter: blur(0px);">
        <NavTop/>
        <div class="container-fluid">
          <h3 class="text-dark mb-1">Blank Page</h3>
        </div>
      </div>
      <Footer/>
    </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
  </div>
  </div>
</template>

<script>
import NavLeft from '../components/partials/NavLeft.vue';
import NavTop from '../components/partials/NavTop.vue';
import Footer from '../components/partials/Footer.vue';

export default {
    name: 'Home',
    components: { NavTop: NavTop, NavLeft: NavLeft, Footer: Footer }
};
</script>

<style scoped>

</style>
