<template>
  <div>
    <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
      <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
        <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ..."><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
        </form>
        <ul class="navbar-nav flex-nowrap ms-auto">
          <li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
            <div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
              <form class="me-auto navbar-search w-100">
                <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                  <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                </div>
              </form>
            </div>
          </li>
          <div class="d-none d-sm-block topbar-divider"></div>
          <li class="nav-item dropdown no-arrow">
            <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
              <span class="d-none d-lg-inline me-2 text-gray-600 small">{{ (user.firstName && user.lastName) ? user.firstName + ' ' + user.lastName : user.email}}</span>
              <img class="border rounded-circle img-profile" src="src/assets/img/dogs/image2.jpeg"></a>
              <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                <button class="dropdown-item" @click="logout"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '../../config';
import { getUser } from '../../js/user';

getUser(window.id).then((user) => {
    window.user = user;
}).catch((err) => {
    console.log(err);
});

export default {
    name: 'NavTop',
    data() {
        return {
            isAdmin: window.isAdmin,
            user: window.user
        };
    },
    mounted() {
        getUser(window.id).then((user) => {
            this.user = user;
        });
    },
    methods: {
        logout() {
            axios.get(`${serverUrl}/auth/logout`)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('jwt');
                        axios.defaults.headers.common.Authorization = null;
                        window.isAdmin = false;
                        window.id = null;
                        window.user = null;
                        this.$router.push('/login');
                    }
                })
                .catch();
        }
    }
};
</script>

<style scoped>

</style>
