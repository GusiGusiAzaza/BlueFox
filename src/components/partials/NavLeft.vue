<template>
  <div>
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0" style='height: 100%'>
      <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
        <img src="../../../resource/icons/logo.svg" style="width: 55px;" />
        <div class="sidebar-brand-icon"></div>
        <div class="sidebar-brand-text mx-3"><span>Bluefox</span></div>
      </a>
        <hr class="sidebar-divider my-0" />

        <ul class="navbar-nav text-light" id="accordionSidebar">
          <li class="nav-item" @click="currentTab = 0">
            <router-link class="nav-link"  to="/" :class="{active: currentTab === 0}"><i class="fas fa-home"></i><span>Home</span></router-link></li>
          <li class="nav-item" @click="currentTab = 1">
            <router-link class="nav-link" to="/profile" :class="{active: currentTab === 1}"><i class="fas fa-user"></i><span>Profile</span></router-link></li>
          <li class="nav-item" @click="currentTab = 2">
            <router-link class="nav-link" to="/themes" :class="{active: currentTab === 2}"><i class="fas fa-book-reader"></i><span>Tests themes</span></router-link></li>
          <li class="nav-item" @click="currentTab = 3" v-if="isAdmin">
            <router-link class="nav-link" to="/admin" :class="{active: currentTab === 3}"><i class="fas fa-edit"></i><span>Admin Panel</span></router-link></li>
        </ul>
        <div class="text-center d-none d-md-inline">
          <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'NavLeft',
    data() {
        return {
            isAdmin: window.isAdmin,
            currentTab: window.currentTab
        };
    }
};
</script>
<style scoped>

</style>
