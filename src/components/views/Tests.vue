<template>
  <div class="container">
    <h3 class="text-dark mb-2">Tests</h3>
    <p v-if='testsLoading'>Loading...</p>
    <div class="row">
      <div class="col-md-9 col-lg-3" v-for='test in tests' :key='test'>
        <div class="card m-4">
          <div class="card-header py-3">
            <h6 class="text-primary m-0 fw-bold">{{ test.name }}</h6>
          </div>
          <div class="card-body">
            <p class="mb-md-2 text-primary">Time limit: {{ test.timeLimit }} minute(s)</p>
            <p class="mb-md-2 text-primary">Score to pass: {{ test.passScore }}%</p>
            <router-link class="btn btn-outline-primary btn-icon-split" :to="'/themes/' + $route.params.themeId + '/tests/' + test._id + '/solve'">
              <span class="icon"><i class="fas fa-arrow-right"></i></span>
              <span class="text-dark text">Start {{ test.name }} test</span>
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
    name: 'Tests',
    data() {
        return {
            tests: [],
            testsLoading: false
        };
    },
    created() {
    // fetch the data when the view is created and the data is
    // already being observed
        this.fetchTests();
    },
    watch: {
    // call again the method if the route changes
        $route: 'fetchTests'
    },
    methods: {
        fetchTests() {
            this.testsLoading = true;
            testController.getTestsByThemeId(this.$route.params.themeId)
                .then((tests) => {
                    this.testsLoading = false;
                    this.tests = tests;
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
