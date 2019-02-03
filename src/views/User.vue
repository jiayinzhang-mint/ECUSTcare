<template>
  <v-layout row wrap>
    <transition appear appear-active-class="card-enter">
      <v-container>
        <v-flex xs12>
          <v-card color="flat">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs8>
                  <div>
                    <div class="headline">{{userInfo.username}}</div>
                  </div>
                </v-flex>
                <v-flex xs4>
                  <v-avatar size="100px"></v-avatar>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12 class="mt-3">
          <v-btn round depressed block color="primary" dark @click="logOut">注销</v-btn>
        </v-flex>
      </v-container>
    </transition>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$confirm("确认注销?")
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(err => {});
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.$emit("updatetab", "user");
  }
};
</script>

<style>
</style>
