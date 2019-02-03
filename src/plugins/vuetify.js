import Vue from "vue";
import Vuetify from "vuetify/lib";
import "../assets/style.css";
import "vuetify/src/stylus/app.styl";
import "../components/confirm-dialog/index";
import "../components/snackbar/index";

Vue.use(Vuetify, {
  iconfont: "md"
});
