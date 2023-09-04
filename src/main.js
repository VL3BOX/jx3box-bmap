Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";

// 数据与路由
import store from "./store";

import App from "./App.vue";
new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");
