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
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations(["updateUserInfo"]),
    ...mapActions(["getRouteList"]),
    login() {
      if (this.$refs.loginForm.validate()) {
        this.$ajax
          .post("/login", {
            username: this.username,
            password: this.password
          })
          .then(async data => {
            data = data.data;
            if (data.message == "登陆成功") {
              await this.getRouteList({ year: 2019 });
              this.$snackbar.show("success");
              const userInfo = {};
              userInfo.username = this.username;
              this.updateUserInfo(userInfo);
              this.$router.push({ path: "/home" });
            } else {
              this.$snackbar.show("fail");
            }
          });
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
