<template>
  <div id="page-top">
  <div id="wrapper">
    <NavLeft/>
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <NavTop/>
        <div class="container-fluid">
          <div class="text-center mt-5">
            <div class="error mx-auto" data-text="404">
              <p class="m-0">404</p>
            </div>
            <p class="text-dark mb-5 lead">Page Not Found</p>
            <p class="text-black-50 mb-0">It looks like you found a glitch in the matrix...</p><a href="/">← Back to Dashboard</a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
  </div>
  </div>
</template>

<script>
import NavLeft from '../components/partials/NavLeft.vue';
import NavTop from '../components/partials/NavTop.vue';
import Footer from '../components/partials/Footer.vue';

export default {
    name: 'NotFound',
    components: { NavTop: NavTop, NavLeft: NavLeft, Footer: Footer }
};
</script>

<style scoped>

</style>
