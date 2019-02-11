<template>
  <v-layout fill-height>
    <v-flex xs4 style="height:calc(100vh - 64px);overflow :auto">
      <v-container>
        <v-toolbar class="transparent" flat>
          <h1 class="mb-3 mt-1 headline font-weight-medium" style="margin-left:-16px">{{year}} 疗养活动</h1>
          <v-spacer></v-spacer>
          <v-btn icon flat class="mb-3" @click="refresh" style="margin-right:-16px">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card class="mb-3" color="primary lighten-1" dark>
          <v-card-title class="font-weight-medium">测试5日游 - 测试1团
            <v-spacer></v-spacer>
            <v-btn flat round dark small>取消报名</v-btn>
            <v-btn flat round dark small>查看详情</v-btn>
          </v-card-title>
        </v-card>
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">报名时间段
            <v-spacer></v-spacer>2019.1.2 00:00 - 2019.11.1 00:00
          </v-card-title>
          <v-card-title class="font-weight-medium">剩余时间
            <v-spacer></v-spacer>240天 00:00:00
          </v-card-title>
        </v-card>

        <transition-group appear appear-active-class="card-enter">
          <template v-for="(item,i) in routeList">
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card ripple>
                  <v-img
                    class="white--text"
                    height="200px"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549824939310&di=ce3363d93c5aeffe60e415593afacf1e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4256572454%2C870597285%26fm%3D214%26gp%3D0.jpg"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-medium">{{item.routeName}}</span>
                      <br>
                      <span class="grey--text">¥ {{item.routePrice}}</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn flat block round color="primary" :to="'/route/'+item.id">查看详情</v-btn>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card ripple>
                  <v-img
                    class="white--text"
                    height="200px"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549824939310&di=ce3363d93c5aeffe60e415593afacf1e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4256572454%2C870597285%26fm%3D214%26gp%3D0.jpg"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-medium">{{item.routeName}}</span>
                      <br>
                      <span class="grey--text">于 {{item.publishTime | moment("YYYY-MM-DD")}} 发布</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn flat block round color="primary">查看详情</v-btn>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card ripple>
                  <v-img
                    class="white--text"
                    height="200px"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549824939310&di=ce3363d93c5aeffe60e415593afacf1e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4256572454%2C870597285%26fm%3D214%26gp%3D0.jpg"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-medium">{{item.routeName}}</span>
                      <br>
                      <span class="grey--text">于 {{item.publishTime | moment("YYYY-MM-DD")}} 发布</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn flat block round color="primary">查看详情</v-btn>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card ripple>
                  <v-img
                    class="white--text"
                    height="200px"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549824939310&di=ce3363d93c5aeffe60e415593afacf1e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4256572454%2C870597285%26fm%3D214%26gp%3D0.jpg"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-medium">{{item.routeName}}</span>
                      <br>
                      <span class="grey--text">于 {{item.publishTime | moment("YYYY-MM-DD")}} 发布</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn flat block round color="primary">查看详情</v-btn>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card ripple>
                  <v-img
                    class="white--text"
                    height="200px"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549824939310&di=ce3363d93c5aeffe60e415593afacf1e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4256572454%2C870597285%26fm%3D214%26gp%3D0.jpg"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-medium">{{item.routeName}}</span>
                      <br>
                      <span class="grey--text">于 {{item.publishTime | moment("YYYY-MM-DD")}} 发布</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn flat block round color="primary">查看详情</v-btn>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
        </transition-group>

        <v-dialog v-model="loading" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>请稍后
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-flex>
    <v-flex xs8 style="background-color:#f5f5f5">
      <router-view v-if="$route.params.id"></router-view>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择项目</div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      year: null
    };
  },
  methods: {
    ...mapActions(["getRouteList"]),
    async refresh() {
      this.loading = true;
      await this.getRouteList({ year: this.year });
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["routeList"])
  },
  mounted() {
    var today = new Date();
    this.year = today.getFullYear();
  }
};
</script>

<style>
</style>
