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
            <p class="mb-md-2 text-primary">Tries: {{ test.tryCount }}</p>
            <p class="mb-md-2 text-primary">Score: {{ test.score }}</p>
            <router-link class="btn btn-outline-primary btn-icon-split" v-if='!test.tryCount' :to="'/themes/' + $route.params.themeId + '/tests/' + test._id + '/solve'">
              <span class="icon"><i class="fas fa-arrow-right"></i></span>
              <span class="text-dark text">Start {{ test.name }} test</span>
            </router-link>
            <router-link v-if='test.tryCount' class="btn btn-outline-warning btn-icon-split mt-2" :to="'/results/' + test._id">
              <span class="icon"><i class="fas fa-arrow-right"></i></span>
              <span class="text-dark text">View last result</span>
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
            results: [],
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

            testController.getResultsByUserId(window.id)
                .then((results) => {
                    this.results = results;
                    if (this.results.find((r) => r.testId === this.$route.params.testId)) {
                        this.msg = 'You already completed this test';
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            testController.getTestsByThemeId(this.$route.params.themeId)
                .then((tests) => {
                    this.testsLoading = false;
                    this.tests = tests;
                    this.tests.forEach((test) => {
                        const result = this.results.find((r) => r.testId === test._id);
                        if (result) {
                            test.tryCount = result.tryCount;
                            test.score = result.score;
                        } else {
                            test.tryCount = 0;
                            test.score = 'Not completed';
                        }
                    });
                    this.testsLoading = false;
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
