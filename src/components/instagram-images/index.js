import TheInstagramFeed from "./src/TheInstagramFeed";

export default {
  install(Vue, options) {
    Vue.component("TheInstagramFeed", TheInstagramFeed);
  },
};

export { TheInstagramFeed };
