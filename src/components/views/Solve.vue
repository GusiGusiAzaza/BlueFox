<template>
  <div class="container">
      <p v-if='questionsLoading'>Loading...</p>
      <div class="row" v-for='(question, index) in questions' :key='question'>
        <div>
          <div class="card m-4" >
            <div class="card-header py-3">
              <h5 class="text-primary text-lg-center m-0 fw-bold">{{ question.question }}</h5>
            </div>
            <div v-for='(answer, index) in question.answers' :key='answer' style="margin: 25px 0 15px 50px;">
              <input v-if='question.rightCount === 1' type='radio' :name='question._id' :value='answer._id' :checked='question[index].userAnswer'>
              <input v-else type='checkbox' :name='question._id' :value='answer._id' :checked='question[index].userAnswer'>
              <label :for="index" style="margin-left: 20px;">{{ answer.answer }}</label>
            </div>
          </div>
        </div>
      </div>
      <button class='btn-primary rounded-3 container-fluid' style='height: 50px; margin: 50px 0px'>
        <span class="text-light">Finish Test</span>
      </button>
  </div>
</template>

<script>
import * as testController from '../../js/test';

export default {
    name: 'Solve',
    data() {
        return {
            test: null,
            questions: [],
            questionsLoading: true,
            userAnswers: {}
        };
    },
    created() {
    // fetch the data when the view is created and the data is
    // already being observed
        this.fetchQuestions();
    },
    watch: {
    // call again the method if the route changes
        $route: 'fetchQuestions'
    },
    methods: {
        fetchQuestions() {
            this.questionsLoading = true;
            testController.getQuestionsByTestId(this.$route.params.testId)
                .then((questions) => {
                    this.questionsLoading = false;
                    this.questions = questions;
                    questions.forEach((q) => {
                        q.rightCount = 0;
                        q.userAnswer = [];
                        q.answers.forEach((a) => { if (a.isRight) q.rightCount++; });
                    });
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
