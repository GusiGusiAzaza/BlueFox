<template>
  <div class="container">
    <p v-if='questionsLoading'>Loading...</p>
    <small class="form-text text-danger" v-text="msg"></small>
    <div class="row" v-for='(question, index) in questions' :key='question'>
      <div>
        <div class="card m-4" >
          <div class="card-header py-3">
            <h5 class="text-primary text-lg-center m-0 fw-bold">{{ question.question }}</h5>
          </div>
          <div v-for='(answer, index) in question.answers' :key='answer' style="margin: 25px 0 15px 50px;">
            <input v-if='question.rightCount === 1' type='radio' :name='question._id' :value='answer._id' :checked='questions[index].userAnswer'>
            <input v-else type='checkbox' :name='question._id' :value='answer._id' :checked='questions[index].userAnswer'>
            <label :for="index" style="margin-left: 20px;">{{ answer.answer }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as testController from '../../js/test';

export default {
    name: 'TestResults',
    data() {
        return {
            testResults: [],
            testResultsLoading: false
        };
    },
    created() {
    // fetch the data when the view is created and the data is
    // already being observed
        this.fetchTestResults();
    },
    watch: {
    // call again the method if the route changes
        $route: 'fetchTestResults'
    },
    methods: {
        fetchTestResults() {
            this.testResultsLoading = true;
            testController.getResultsByUserId(window.id)
                .then((testResults) => {
                    this.testResultsLoading = false;
                    this.testResults = testResults;
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
