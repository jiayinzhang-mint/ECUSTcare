import Vue from "vue";
import Vuetify from "vuetify";
import "../assets/style.css";
import "vuetify/src/stylus/app.styl";
import colors from "vuetify/es5/util/colors";
import "../components/confirm-dialog/index";
import "../components/snackbar/index";
import "../components/loading/index";

Vue.use(Vuetify, {
  theme: {
    primary: colors.deepOrange.darken1,
    accent: colors.deepOrange.darken1
  },
  iconfont: "md"
});
