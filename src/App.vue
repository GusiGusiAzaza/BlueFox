<template>
  <div id="page-top">
    <div id="wrapper">
      <NavLeft v-if="!['login', 'register'].includes($route.name)"/>
      <div class="d-flex flex-column" id="content-wrapper">
        <div id="content" style="filter: blur(0px);">
          <NavTop v-if="!['login', 'register'].includes($route.name)"/>
          <router-view/>
        </div>
        <Footer v-if="!['login', 'register'].includes($route.name)"/>
      </div>
      <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavLeft from './components/partials/NavLeft.vue';
import NavTop from './components/partials/NavTop.vue';
import Toast from './components/partials/Toast.vue';

export default {
    name: 'App',
    components: { NavTop, NavLeft, Toast }
};

if (localStorage.getItem('jwt') != null) {
    window.id = JSON.parse(localStorage.getItem('user')).id;
    window.isAdmin = JSON.parse(localStorage.getItem('user')).isAdmin;
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
}

</script>

<style>
@import './assets/bootstrap/css/bootstrap.min.css';
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
@import './assets/fonts/fontawesome-all.min.css';
@import './assets/fonts/font-awesome.min.css';
@import './assets/fonts/fontawesome5-overrides.min.css';
</style>
