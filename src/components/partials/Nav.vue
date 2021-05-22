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
        <li class="nav-item"><a class="nav-link" href="login.html"><i class="far fa-user-circle"></i><span>Login</span></a></li>
        <li class="nav-item"><a class="nav-link" href="register.html"><i class="fas fa-user-circle"></i><span>Register</span></a></li>
        <li class="nav-item"><a class="nav-link" href="/notfound"><i class="fas fa-exclamation-circle"></i><span>Page Not Found</span></a></li>
        <li class="nav-item"><router-link to="/notfound" class="nav-link"></router-link></li>
        <li class="nav-item"><a class="nav-link" href="blank.html"><i class="fas fa-window-maximize"></i><span>Blank Page</span></a></li>
      </ul>
      <div class="text-center d-none d-md-inline">
        <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
      </div>
    </div>
  </nav>
</template>
<script>

</script>
<style scoped>
@media (min-width: 768px) {
  .sidebar {
    width: 14rem !important;
  }
}

.sidebar {
  width: 6.5rem;
  min-height: 100vh;
}

.bg-gradient-primary {
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
}

.p-0 {
  padding: 0 !important;
}

.align-items-start {
  align-items: flex-start !important;
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: .5rem;
  padding-bottom: .5rem;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #858796;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

</style>
