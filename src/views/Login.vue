<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md4>
            <v-card>
              <v-container>
                <v-card-text class="mb-4">
                  <p class="text-sm-center headline mb-5">登录</p>
                  <v-form ref="loginForm">
                    <v-text-field
                      prepend-icon="person"
                      name="login"
                      label="用户名"
                      v-model="username"
                      type="text"
                      :rules="[v => !!v || '请填写用户名']"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      prepend-icon="lock"
                      name="password"
                      label="密码"
                      type="password"
                      v-model="password"
                      @keyup.enter="login"
                      :rules="[v => !!v || '请填写密码']"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn depressed round block color="primary" @click="login">登录</v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>请稍后
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import authService from "../service/AuthService";
import careService from "../service/CareService";

import qs from "qs";
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        try {
          var data = await authService.login(this.username, this.password);
          await careService.getRouteList(2019);
          this.loading = false;
          if (data.device == "mobile") {
            this.$router.push({ path: "/mobile/home" });
          } else {
            this.$router.push({ path: "/home" });
          }
        } catch (err) {
          err;
        }
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
