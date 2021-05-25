<template>
  <div class="container">
    <h3 class="text-dark mb-2">Test themes</h3>
    <p v-if='themesLoading'>Loading...</p>
    <div class="row">
      <div class="col-md-9 col-lg-3" v-for='theme in themes' :key='theme'>
        <div class="card m-4">
          <div class="card-header py-3">
            <h6 class="text-primary m-0 fw-bold">{{ theme.name }}</h6>
          </div>
          <div class="card-body">
            <router-link class="btn btn-outline-primary btn-icon-split" :to="'/themes/' + theme._id + '/tests'">
              <span class="icon"><i class="fas fa-arrow-right"></i></span>
              <span class="text-dark text">{{ theme.name }} Tests</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as testController from '../../js/test';

export default {
    name: 'Themes',
    data() {
        return {
            themes: [],
            themesLoading: true
        };
    },
    created() {
    // fetch the data when the view is created and the data is
    // already being observed
        this.fetchThemes();
    },
    watch: {
    // call again the method if the route changes
        $route: 'fetchThemes'
    },
    methods: {
        fetchThemes() {
            this.themesLoading = true;
            testController.getThemes()
                .then((themes) => {
                    this.themesLoading = false;
                    this.themes = themes;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>

</style>
