<template>
  <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
    <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
      <img src="../../../resource/icons/logo.svg" style="width: 55px;" />
      <div class="sidebar-brand-icon"></div>
      <div class="sidebar-brand-text mx-3"><span>Bluefox</span></div>
    </a>
      <hr class="sidebar-divider my-0" />
      <ul class="navbar-nav text-light" id="accordionSidebar">
        <li class="nav-item"><a class="nav-link active" href="index.html"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
        <li class="nav-item"><a class="nav-link" href="profile.html"><i class="fas fa-user"></i><span>Profile</span></a></li>
        <li class="nav-item"><a class="nav-link" href="table.html"><i class="fas fa-table"></i><span>Table</span></a></li>
        <li class="nav-item"><router-link class="nav-link" to="/login"><i class="far fa-user-circle"></i><span>Login</span></router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/register"><i class="fas fa-user-circle"></i><span>Register</span></router-link></li>
        <li class="nav-item"><a class="nav-link" href="blank.html"><i class="fas fa-window-maximize"></i><span>Blank Page</span></a></li>
      </ul>
      <div class="text-center d-none d-md-inline">
        <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
    name: 'NavLeft'
};
</script>
<style scoped>

</style>
