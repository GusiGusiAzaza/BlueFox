<template>
  <div class="bg-gradient-primary">
  <div class="container">
    <div class="card shadow-lg o-hidden border-0 my-5">
      <div class="card-body p-0">
        <div class="row">
          <div class="col-lg-5 d-none d-lg-flex">
            <div class="flex-grow-1 bg-register-image" style="background-image: url(&quot;src/assets/img/dogs/image2.jpeg&quot;);"></div>
          </div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h4 class="text-dark mb-4">Create an Account!</h4>
              </div>
              <form class="user">
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
                    <input class="form-control form-control-user" type="password" id="RepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" required>
                  </div>
                  <div>
                    <ul>
                      <li class="form-text text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
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
            status: 0,
            errors: [],
            activeClass: 'active'
        };
    },
    methods: {
        registerUser() {
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
                    this.status = 406;
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>

</style>
