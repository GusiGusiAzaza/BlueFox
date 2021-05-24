<template>
  <div id="page-top">
    <div id="wrapper">
    <div class="bg-gradient-primary">
      <div class="container">
        <div class="card shadow-lg o-hidden border-0 my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-5 d-none d-lg-flex">
                <div class="flex-grow-1 bg-register-image" style="background-image: url(&quot;src/assets/img/previews/[001278].jpg&quot;);"></div>
              </div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h4 class="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form class="user" @submit.prevent="registerUser">
                    <div class="row mb-3">
                    </div>
                    <div class="mb-3">
                      <input class="form-control form-control-user" v-model="login" type="email" id="InputEmail" placeholder="Email Address" name="email" required autofocus>
                    </div>
                    <div class="row mb-3">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input class="form-control form-control-user" v-model="password" type="password" id="PasswordInput" placeholder="Password" name="password" required>
                      </div>
                      <div class="col-sm-6">
                        <input class="form-control form-control-user" v-model="passwordConfirmation" type="password" id="RepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" required>
                      </div>
                      <div>
                        <small class="form-text text-danger" v-text="error"></small>
                      </div>
                    </div><button class="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
                    <hr>
                  </form>
                  <div class="text-center"><router-link class="small" to="/login">Already have an account? Login!</router-link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '../../config';

export default {
    name: 'Signup',
    data() {
        return {
            login: '',
            password: '',
            passwordConfirmation: '',
            status: 0,
            error: '',
            activeClass: 'active'
        };
    },
    methods: {
        registerUser() {
            const EMAIL_EXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!(EMAIL_EXP.test(this.login.toLocaleLowerCase()))) {
                this.error = 'Invalid email';
                return;
            }
            if (this.password.length < 6) {
                this.error = 'At least 6 characters in password';
                return;
            }

            if (this.password === this.passwordConfirmation) {
                axios({
                    method: 'post',
                    url: `${serverUrl}/auth/signup`,
                    data: {
                        login: this.login,
                        password: this.password
                    }
                })
                    .then((res) => {
                        this.status = res.status;
                        if (res.status === 200) {
                            this.$router.push('/login');
                        }
                        console.log(res);
                    })
                    .catch((err) => {
                        this.error = 'Email is already in use';
                        console.log(err);
                    });
            } else {
                this.password = '';
                this.passwordConfirmation = '';

                this.error = 'Password dont match';
            }
        }
    }
};
</script>

<style>
nav, footer {
  display: none;
}
</style>
