<template>
  <div id="page-top">
    <div id="wrapper">
      <div class="d-flex flex-column" id="content-wrapper">
        <div id="content" style="filter: blur(0px);">
          <div class="container-fluid" style="margin-right: 24px;">
            <h3 class="text-center text-dark mb-1">Themes</h3>
            <input type="text" maxlength='50' class="form-control-lg" v-model='newTheme' placeholder="Enter theme name" style="margin: 9px; border-style: solid;border-width: 2px;border-color: var(--bs-blue);" />
            <button class="btn btn-success btn-icon-split" type="button" style="margin-left: 20px;" :disabled="!newTheme" @click='addTheme'>
              <span class="text-white-50 icon"><i class="fas fa-check"></i></span>
              <span class="text-white text" style="width: 130px;">Add theme</span>
            </button>
            <small class="form-text" :class="themeSuccess ? 'text-success' : 'text-danger'"  v-text="themeMsg"></small>
            <div class="table-responsive text-start" style="border-color: var(--bs-blue);margin-top: 20px;">
              <table class="table table-hover" >
                <thead>
                <tr>
                  <th>Theme</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if='themesLoading'>Loading...</tr>
                <tr v-for='theme in themes' :key='theme.name' :id='theme._id' :style='{background: theme._id === selectedTheme ? "LightBlue" : ""}' @click='loadTests'>
                  <td>{{ theme.name }}</td>
                </tr>
                </tbody>
              </table>
              <hr style="color: blue;height: 3px;">
            </div>
            <h3 class="text-center text-dark mb-1 mt-4">Tests</h3>
            <input type="text" maxlength='50' class="form-control-lg" v-model='newTest' placeholder="Enter test name" style="margin: 9px; border-style: solid;border-width: 2px;border-color: var(--bs-blue);" />
            <input type="number" class="form-control-lg" min='0' max='240' v-model='newTimeLimit' placeholder="Time limit" style="margin: 9px; border-style: solid;border-width: 2px;width: 150px;border-color: var(--bs-blue);" />
            <input type="number" class="form-control-lg" min='0' max='100' v-model='newPassScore' placeholder="Pass score" style="margin: 9px; border-style: solid;border-width: 2px;width: 150px;border-color: var(--bs-blue);" />
            <button class="btn btn-success btn-icon-split" type="button" @click='addTest' style="margin-left: 20px;" :disabled="!(newTest && newTimeLimit && newPassScore)">
              <span class="text-white-50 icon"><i class="fas fa-check"></i></span>
              <span class="text-white text" style="width: 130px;">Add test</span>
            </button>
            <button class="btn btn-danger btn-icon-split" type="button" @click='deleteTest' style="margin-left: 100px;" :disabled="!selectedTest">
              <span class="text-white-50 icon"><i class="fas fa-check"></i></span>
              <span class="text-white text" style="width: 130px;">Delete test</span>
            </button>
            <small class="form-text" :class="testSuccess ? 'text-success' : 'text-danger'"  v-text="testMsg"></small>
            <div class="table-responsive text-start" style="margin-top: 20px;">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Test</th>
                  <th>Theme</th>
                  <th>Time limit</th>
                  <th>Pass score</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if='testsLoading'>Loading...</tr>
                <tr v-for='test in tests' :key='test.name' :id='test._id' :style='{background: test._id === selectedTest ? "LightBlue" : ""}' @click='loadQuestions'>
                  <td>{{ test.name }}</td>
                  <td>{{ themes.find((theme) => theme._id === selectedTheme).name }}</td>
                  <td>{{ test.timeLimit }}</td>
                  <td>{{ test.passScore }}</td>
                </tr>
                </tbody>
              </table>
              <hr style="color: #0000ff;height: 3px;">
            </div>
            <h3 class="text-center text-dark mb-1 mt-4">Questions</h3>
            <div class="table-responsive text-start" style="margin-top: 20px;">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Question</th>
                  <th>Test</th>
                  <th>Number</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if='questionsLoading'>Loading...</tr>
                <tr v-for='question in questions' :key='question.name' :id='question._id' @click='loadAnswers' :style='{background: question._id === selectedQuestion ? "LightBlue" : ""}'>
                  <td>{{ question.question }}</td>
                  <td>{{ tests.find((test) => test._id === selectedTest).name }}</td>
                  <td>{{ question.questionNumber }}</td>
                </tr>
                </tbody>
              </table>
              <hr style="color: blue;height: 3px;">
            </div>
            <h3 class="text-center text-dark mb-1 mt-4" >New question</h3>
            <input type="text" maxlength='200' class="form-control-plaintext" v-model='newQuestion' placeholder="Enter question" style="margin: 9px;border-bottom-width: 2px;border-bottom-color: var(--bs-blue);" />
            <div>
              <div v-for='(answer, index) in answers'>
                  <input type='checkbox' v-model='answers[index].isRight'>
                  <input type="text" maxlength='100' class="form-control-plaintext" placeholder="Enter answer" v-model='answers[index].answer' style="margin: 0 30px 10px 30px;border-bottom-width: 2px;border-bottom-color: var(--bs-blue);" />
              </div>
              <button class="btn btn-primary btn-circle ms-1" @click='pushAnswer'><i class="fas fa-plus text-white"></i></button>
              <button class="btn btn-danger btn-circle ms-1" @click='popAnswer'><i class="fas fa-minus text-white"></i></button>
            </div>
           <button class="btn btn-success btn-icon-split" type="button" @click='addQuestion' :disabled="!(newQuestion && answers.length && answers[0].answer && answers[1].answer)" style="margin-bottom: 34px;margin-left: 20px;margin-top: 10px">
              <span class="text-white-50 icon"><i class="fas fa-check"></i></span>
              <span class="text-white text" style="width: 150px;">Add question</span>
            </button>
            <button class="btn btn-primary btn-icon-split" type="button" @click='updateQuestion' :disabled="!(newQuestion && answers.length && answers[0].answer && answers[1].answer && selectedQuestion)" style="margin-bottom: 34px;margin-left: 20px;margin-top: 10px">
              <span class="text-white-50 icon"><i class="fas fa-check"></i></span>
              <span class="text-white text" style="width: 150px;">Update question</span>
            </button>
            <button class="btn btn-danger btn-icon-split" type="button" @click='deleteQuestion' :disabled="!(newQuestion && answers.length && answers[0].answer && answers[1].answer && selectedQuestion)" style="margin-bottom: 34px;margin-left: 20px;margin-top: 10px">
              <span class="text-white-50 icon"><i class="fas fa-check"></i></span>
              <span class="text-white text" style="width: 150px;">Delete question</span>
            </button>
            <small class="form-text" :class="questionSuccess ? 'text-success' : 'text-danger'"  v-text="questionMsg"></small>
          </div>
        </div>
        <footer class="bg-white sticky-footer">
          <div class="container my-auto">
            <div class="text-center my-auto copyright"><span>Copyright © Kirill Harevich 2021</span></div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import * as testController from '../../js/test';

export default {
    name: 'Admin',
    data() {
        return {
            themes: [],
            tests: [],
            questions: [],
            answers: [],
            newTheme: '',
            newTest: '',
            newTimeLimit: '',
            newPassScore: '',
            newQuestion: '',
            selectedTheme: '',
            selectedTest: '',
            selectedQuestion: '',
            themesLoading: true,
            themeSuccess: true,
            themeMsg: '',
            testsLoading: false,
            testSuccess: true,
            testMsg: '',
            questionsLoading: false,
            questionSuccess: true,
            questionMsg: ''
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
        },
        addTheme() {
            this.themeMsg = '';
            if (this.themes.find((theme) => theme.name === this.newTheme)) {
                this.themeSuccess = false;
                this.themeMsg = 'Error. Theme already exists';
                return;
            }
            testController.addTheme(this.newTheme)
                .then((theme) => {
                    if (theme) {
                        this.themes.push(theme);
                        this.themeSuccess = true;
                        this.themeMsg = 'Added';
                        this.newTheme = '';
                    } else {
                        this.themeSuccess = false;
                        this.themeMsg = 'Error. Try again';
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.themeSuccess = false;
                    this.themeMsg = 'Error. Try again';
                });
        },
        addTest() {
            this.testMsg = '';
            if (this.tests.find((test) => test.name === this.newTest)) {
                this.testSuccess = false;
                this.testMsg = 'Error. Test already exists';
                return;
            }
            if (!this.selectedTheme) {
                this.testSuccess = false;
                this.testMsg = 'Select the theme';
                return;
            }
            if (this.newPassScore < 0 || this.newPassScore > 100) {
                this.testSuccess = false;
                this.testMsg = 'Error. Pass score must be between 0 and 100 %';
                return;
            }
            if (this.newTimeLimit < 0 || this.newTimeLimit > 100) {
                this.testSuccess = false;
                this.testMsg = 'Error. Time limit must be between 0 and 240 minutes';
                return;
            }
            testController.addTest(this.newTest, this.selectedTheme, this.newTimeLimit, this.newPassScore)
                .then((test) => {
                    if (test) {
                        this.tests.push(test);
                        this.testSuccess = true;
                        this.testMsg = 'Added';
                        this.newTest = '';
                    } else {
                        this.testSuccess = false;
                        this.testMsg = 'Error. Try again later';
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.testSuccess = false;
                    this.testMsg = 'Error. Try again later';
                });
        },
        addQuestion() {
            this.questionMsg = '';
            if (this.questions.find((question) => question.name === this.newQuestion)) {
                this.questionSuccess = false;
                this.questionMsg = 'Error. Question already exists';
                return;
            }
            if (!this.selectedTest) {
                this.questionSuccess = false;
                this.questionMsg = 'Select the test';
                return;
            }
            if (this.answers.length < 2 || this.answers.length > 6) {
                this.questionSuccess = false;
                this.questionMsg = 'Between 2 and 6 answers';
                return;
            }

            const number = this.questions.length === 0 ? 1 : Math.max.apply(Math, this.questions.map((q) => q.questionNumber)) + 1;

            testController.addQuestion(this.newQuestion, this.selectedTest, number, this.answers)
                .then((question) => {
                    if (question) {
                        this.questions.push(question);
                        this.questionSuccess = true;
                        this.questionMsg = 'Added';
                        this.answers = null;
                        this.newQuestion = '';
                        this.selectedQuestion = null;
                    } else {
                        this.questionSuccess = false;
                        this.questionMsg = 'Error. Try again later';
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.questionSuccess = false;
                    this.questionMsg = 'Error. Try again later';
                });
        },
        updateQuestion() {
            this.questionMsg = '';
            if (!this.selectedTest) {
                this.questionSuccess = false;
                this.questionMsg = 'Select the test';
                return;
            }
            if (this.answers.length < 2 || this.answers.length > 6) {
                this.questionSuccess = false;
                this.questionMsg = 'Between 2 and 6 answers';
                return;
            }
            if (!this.selectedQuestion) {
                this.questionSuccess = false;
                this.questionMsg = 'Select question';
                return;
            }

            const number = this.questions.find((q) => q._id === this.selectedQuestion).questionNumber;

            testController.updateQuestion(this.selectedQuestion, this.newQuestion, this.selectedTest, number, this.answers)
                .then((question) => {
                    if (question) {
                        this.questionSuccess = true;
                        this.questionMsg = 'Updated';
                        this.answers = null;
                        this.newQuestion = '';
                        this.selectedQuestion = null;
                    } else {
                        this.questionSuccess = false;
                        this.questionMsg = 'Error. Try again later';
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.questionSuccess = false;
                    this.questionMsg = 'Error. Try again later';
                });
        },
        deleteQuestion() {
            this.questionMsg = '';
            if (!this.selectedQuestion) {
                this.questionSuccess = false;
                this.questionMsg = 'Select question';
                return;
            }

            testController.deleteQuestion(this.selectedQuestion)
                .then((deleted) => {
                    if (deleted) {
                        this.questions = this.questions.filter((q) => q._id !== this.selectedQuestion);
                        this.questionSuccess = true;
                        this.questionMsg = 'Deleted';
                        this.answers = null;
                        this.newQuestion = '';
                        this.selectedQuestion = null;
                    } else {
                        this.questionSuccess = false;
                        this.questionMsg = 'Error. Try again later';
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.questionSuccess = false;
                    this.questionMsg = 'Error. Try again later';
                });
        },
        deleteTest() {
            this.testMsg = '';
            if (!this.selectedTest) {
                this.testSuccess = false;
                this.testMsg = 'Select test';
                return;
            }

            testController.deleteTest(this.selectedTest)
                .then((deleted) => {
                    if (deleted) {
                        this.tests = this.tests.filter((q) => q._id !== this.selectedTest);
                        this.testSuccess = true;
                        this.testMsg = 'Deleted';
                        this.answers = null;
                        this.newTest = '';
                        this.selectedTest = null;
                    } else {
                        this.testSuccess = false;
                        this.testMsg = 'Error. Try again later';
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.testSuccess = false;
                    this.testMsg = 'Error. Try again later';
                });
        },
        pushAnswer() {
            if (this.answers.length >= 6) {
                this.questionSuccess = false;
                this.questionMsg = '6 answers max';
                return;
            }
            this.answers.push({ answer: '', isRight: false });
        },
        popAnswer() {
            this.answers.pop();
        },
        loadTests(event) {
            if (event.currentTarget.id === this.selectedTheme) {
                console.log('Theme already selected');
            } else {
                this.testsLoading = true;
                this.tests = null;
                this.selectedTheme = event.currentTarget.id;
                testController.getTestsByThemeId(this.selectedTheme)
                    .then((tests) => {
                        if (tests) {
                            this.tests = tests;
                        } else {
                            this.testSuccess = false;
                            this.testMsg = 'Error. No tests were loaded.';
                        }
                        this.testsLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.testsLoading = false;
                        this.testSuccess = false;
                        this.testMsg = 'Loading tests Error. Try again later';
                    });
            }
        },
        loadQuestions(event) {
            if (event.currentTarget.id === this.selectedTest) {
                console.log('Test already selected');
            } else {
                this.questionsLoading = true;
                this.questions = null;
                this.selectedTest = event.currentTarget.id;
                testController.getQuestionsByTestId(this.selectedTest)
                    .then((questions) => {
                        if (questions) {
                            this.questions = questions;
                        } else {
                            this.questionSuccess = false;
                            this.questionMsg = 'Error. No questions were loaded.';
                        }
                        this.questionsLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.questionSuccess = false;
                        this.questionsLoading = false;
                        this.questionMsg = 'Loading questions Error. Try again later';
                    });
            }
        },
        loadAnswers(event) {
            this.selectedQuestion = event.currentTarget.id;
            const question = this.questions.find((q) => q._id === this.selectedQuestion);
            this.answers = question.answers;
            this.newQuestion = question.question;
        }
    }
};

</script>

<style scoped>

</style>
