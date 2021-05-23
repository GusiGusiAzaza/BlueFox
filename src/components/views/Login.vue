<template>
  <div class="bg-gradient-primary">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-10">
        <div class="card shadow-lg o-hidden border-0 my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-none d-lg-flex">
                <div class="flex-grow-1 bg-login-image" style="background-image: url(&quot;src/assets/img/dogs/image3.jpeg&quot;);"></div>
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
                    <small class="form-text text-danger" v-if="status === 401 || status === 406">Incorrect email or password</small>
                    <button @click="loginUser" class="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
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
            axios({
                method: 'post',
                url: `${serverUrl}/auth/login`,
                data: {
                    login: this.login,
                    password: this.password
                }
            })
                .then((res) => {
                    this.status = res.status;
                    if (res.status === 200) {
                        this.$router.push('/profile');
                    }
                    console.log(res);
                })
                .catch((err) => {
                    this.status = 406;
                    console.log(err);
                });
        }
    }
};
</script>

<style>

</style>
