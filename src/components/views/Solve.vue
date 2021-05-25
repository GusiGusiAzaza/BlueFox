<template>
  <div class="container">
    <h3 class="text-dark mb-2">{{ test.name }} test</h3>
    <p v-if='questionsLoading'>Loading...</p>
    <small class="form-text text-danger" v-text="msg"></small>
    <small class="form-text">Time left: </small>
    <small class="form-text text-primary">{{ timerMinutes }}:{{ timerSeconds }}</small>
    <div class="row" v-for='(question, index) in questions' :key='question'>
      <div>
        <div class="card m-4" >
          <div class="card-header py-3">
            <h5 class="text-primary text-lg-center m-0 fw-bold">{{ question.question }}</h5>
          </div>
          <div v-for='(answer, index) in question.answers' :key='answer' style="margin: 25px 0 15px 50px;">
            <input v-if='question.rightCount === 1' type='radio' :name='question._id' :value='answer._id' @click='radioSelected'>
            <input v-else type='checkbox' :name='question._id' :value='answer._id' @click='checkboxSelected'>
            <label :for="index" style="margin-left: 20px;">{{ answer.answer }}</label>
          </div>
        </div>
      </div>
    </div>
    <button class='btn-primary rounded-3 container-fluid' @click='sendResults' style='height: 50px; margin: 50px 0px'>
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
            testResult: [],
            results: [],
            timerMinutes: 10,
            timerSeconds: 10,
            msg: '',
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
            testController.getResultsByUserId(window.id)
                .then((results) => {
                    this.results = results;
                    if (this.results.find((r) => r.testId === this.$route.params.testId)) {
                        this.msg = 'You already completed this test';
                    } else {
                        testController.getTest(this.$route.params.testId).then((test) => {
                            this.test = test;
                        }).catch((err) => {
                            console.log(err);
                        });
                        testController.getQuestionsByTestId(this.$route.params.testId)
                            .then((questions) => {
                                this.questionsLoading = false;
                                this.questions = questions;
                                this.questions.forEach((q) => {
                                    q.rightCount = 0;
                                    q.userAnswer = null;
                                    q.answers.forEach((a) => { if (a.isRight) q.rightCount++; });
                                });
                                this.userAnswers.answers = [];
                                this.countDownTimer();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        radioSelected(e) {
            const question = this.userAnswers.find((ua) => ua.questionId === e.currentTarget.name);
            console.log(question);
            console.log(e.currentTarget.name);
            console.log(e.currentTarget.id);
            if (question) {
                question.answers.push = e.currentTarget.id;
            } else {
                this.userAnswers.questionId = e.currentTarget.name;
                this.userAnswers.answers.push = e.currentTarget.id;
            }
        },
        checkboxSelected(e) {
            this.userAnswers.questionId = e.currentTarget.name;
            this.userAnswers.answerId = e.currentTarget.id;
        },
        sendResults() {
            this.testResult.testId = this.test._id;
            this.testResult.questionsCount = this.questions.length;
        },
        countDownTimer() {
            if (this.timerSeconds >= 0) {
                setTimeout(() => {
                    if (this.timerSeconds === 0 && this.timerMinutes === 0) {
                        this.sendResults();
                        return;
                    }
                    if (this.timerSeconds === 0) {
                        this.timerMinutes -= 1;
                        this.timerSeconds = 59;
                    }
                    this.timerSeconds -= 1;
                    this.countDownTimer();
                }, 1000);
            }
        }
    }

};
</script>

<style scoped>

</style>
