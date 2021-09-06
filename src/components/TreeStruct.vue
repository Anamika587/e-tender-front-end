<template>
  <div class="TreeStruct">
    <h1>Tree Structure</h1>
    <v-jstree
      :data="data"
      multiple
      allow-batch
      whole-row
      @item-toggle="toggleHandler"
    ></v-jstree>
  </div>
</template>
<script>
import VJstree from "vue-jstree";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/data",
});

export default {
  components: {
    VJstree,
  },
  created() {
    this.getDivision();
  },
  data() {
    return {
      data: [],
    };
  },

  methods: {
    getDivision() {
      instance
        .get("/division")
        .then((response) => {
          this.data = response.data.response;
        })
        .catch((error) => {
          alert(error.response.error);
        });
    },
    toggleHandler(node, item) {
      console.log("node:", node);
      console.log("item:", item);
    },
  },
};
</script>
