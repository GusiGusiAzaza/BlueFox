<template>
  <div>
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <h3 class="text-dark mb-4">Profile</h3>
          <div class="row mb-3">
            <div class="col-lg-4">
              <div class="card mb-3">
                <div class="card-body text-center shadow">
                  <img class="rounded-circle mb-3 mt-4" src="src/assets/img/dogs/image2.jpeg" width="160" height="160">
                </div>
              </div>
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="text-primary fw-bold m-0">Statistics</h6>
                </div>
                <div class="card-body">
                  <h4 class="small fw-bold">Right answered<span class="float-end">{{ user.rightAnswered }}/{{ user.totalAnswered }} ({{rightAnswered}})%</span></h4>
                  <div class="progress progress-bar-striped mb-3">
                    <div class="progress-bar bg-success" :style="{width: `${rightAnswered}%`}"><span class="visually-hidden"></span></div>
                  </div>
                  <h4 class="small fw-bold">Tests passed<span class="float-end">{{ user.passedTestsCount }}/{{ user.finishedTestsCount }} ({{passedTestsCount}})%</span></h4>
                  <div class="progress progress-bar-striped mb-3">
                    <div class="progress-bar bg-warning" :style="{width: `${passedTestsCount}%`}"><span class="visually-hidden"></span></div>
                  </div>
                  <h4 class="small fw-bold">Average score<span class="float-end">{{ user.avgScore }}%</span></h4>
                  <div class="progress progress-bar-striped mb-3">
                    <div class="progress-bar bg-primary" :style="{width: `${user.avgScore}%`}"><span class="visually-hidden"></span></div>
                  </div>
                  <h4 class="small fw-bold">Payout Details<span class="float-end">80%</span></h4>
                  <div class="progress progress-bar-striped mb-3">
                    <div class="progress-bar bg-info" style="width: 80%;"><span class="visually-hidden"></span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row">
                <div class="col">
                  <div class="card shadow mb-3">
                    <div class="card-header py-3">
                      <p class="text-primary m-0 fw-bold">User Settings</p>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="updateUser">
                        <div class="row">
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="username"><strong>Username</strong></label>
                              <input class="form-control" type="text" id="username" v-model="user.username" placeholder='username' name="username">
                            </div>
                          </div>
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="email"><strong>Email Address</strong></label>
                              <input class="form-control" type="email" id="email" v-model="user.email" disabled name="email">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="first_name"><strong>First Name</strong></label>
                              <input class="form-control" type="text" id="first_name" v-model="user.firstName" placeholder="John" name="first_name"></div>
                          </div>
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="last_name"><strong>Last Name</strong></label>
                              <input class="form-control" type="text" id="last_name" v-model="user.lastName" placeholder="Doe" name="last_name">
                            </div>
                          </div>
                        </div>
                        <div class="mb-3">
                          <button class="btn btn-primary btn-sm" type="submit">Save Settings</button>
                          <small class="form-text text-success" v-text="status"></small>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="card shadow">
                    <div class="card-header py-3">
                      <p class="text-primary m-0 fw-bold">Contact Settings</p>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="updateUser">
                        <div class="mb-3"><label class="form-label" for="address"><strong>Address</strong></label>
                          <input class="form-control" type="text" id="address" v-model="user.address" placeholder="Sunset Blvd, 38" name="address"></div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="city"><strong>City</strong></label>
                              <input class="form-control" type="text" id="city" v-model="user.city" placeholder="Los Angeles" name="city"></div>
                          </div>
                          <div class="col">
                            <div class="mb-3"><label class="form-label" for="country"><strong>Country</strong></label>
                              <input class="form-control" type="text" id="country" v-model="user.country" placeholder="USA" name="country"></div>
                          </div>
                        </div>
                        <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div>
                      </form>
                    </div>
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
import { getUser } from '../../js/user';

export default {
    name: 'Profile',
    data() {
        return {
            user: null,
            rightAnswered: 0,
            passedTestsCount: 0,
            status: '',
            error: ''
        };
    },
    methods: {
        updateUser() {
            axios({
                method: 'post',
                url: `${serverUrl}/users`,
                data: {
                    username: this.user.username,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    address: this.user.address,
                    city: this.user.city,
                    country: this.user.country
                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                        this.user = res.data;
                        this.status = 'Updated';
                    }
                    return null;
                })
                .catch((err) => {
                    console.log(err);
                    this.status = 'Update error';
                });
        },
        setData(err, user) {
            if (err) {
                this.error = err.toString();
            } else {
                this.user = user;
                this.rightAnswered = user.totalAnswered ? ((user.rightAnswered / user.totalAnswered) * 100).toFixed(1) : 0;
                this.passedTestsCount = user.finishedTestsCount ? ((user.passedTestsCount / user.finishedTestsCount) * 100).toFixed(1) : 0;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        getUser(window.id)
            .then((user) => {
                next((vm) => vm.setData(null, user));
            })
            .catch((err) => {
                next((vm) => vm.setData(err, null));
            });
    },
    beforeRouteUpdate(to, from, next) {
        this.user = null;
        getUser(window.id)
            .then((user) => {
                this.setData(null, user);
                next();
            })
            .catch((err) => {
                this.setData(err, null);
                next();
            });
    }
};
</script>

<style scoped>

</style>
