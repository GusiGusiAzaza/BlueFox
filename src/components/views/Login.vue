<template>
  <div class="bg-gradient-primary">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-10">
        <div class="card shadow-lg o-hidden border-0 my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-none d-lg-flex">
                <div class="flex-grow-1 bg-login-image" style="background-image: url(&quot;src/assets/img/previews/[057794].jpg&quot;);"></div>
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h4 class="text-dark mb-4">Welcome Back!</h4>
                  </div>
                  <form class="user" @submit.prevent="loginUser">
                    <div class="mb-3">
                      <input class="form-control form-control-user" v-model="login" type="email" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" required autofocus>
                    </div>
                    <div class="mb-3">
                      <input class="form-control form-control-user" v-model="password" type="password" id="InputPassword" placeholder="Password" name="password" required>
                    </div>
                    <small class="form-text text-danger" v-text="error"></small>
                    <button class="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                    <hr>
                  </form>
                  <div class="text-center"><router-link class="small" to="/register">Create an Account!</router-link></div>
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
    name: 'Login',
    data() {
        return {
            login: '',
            password: '',
            status: 0,
            error: '',
            activeClass: 'active'
        };
    },
    methods: {
        loginUser() {
            const EMAIL_EXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!(EMAIL_EXP.test(this.login.toLocaleLowerCase()))) {
                this.error = 'Invalid email';
                return;
            }

            axios({
                method: 'post',
                url: `${serverUrl}/auth/login`,
                data: {
                    login: this.login,
                    password: this.password
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        const { isAdmin } = res.data;
                        localStorage.setItem('user', JSON.stringify({ id: res.data.id, isAdmin }));
                        localStorage.setItem('jwt', res.data.token);
                        window.id = res.data.id;

                        if (localStorage.getItem('jwt') != null) {
                            this.$emit('loggedIn');
                            axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                            if (this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl);
                            } else if (isAdmin) {
                                window.isAdmin = true;
                                this.$router.push('profile');
                            } else {
                                window.isAdmin = false;
                                this.$router.push('profile');
                            }
                        }
                    }
                })
                .catch((err) => {
                    this.error = 'Invalid email or password';
                    console.log(err);
                });
        }
    }
};
</script>

<style >

</style>
