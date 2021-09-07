<template>
  <div class="mt-20 px-8">
    <h1>Tree Structure</h1>
    <v-jstree
      :data="data"
      multiple
      allow-batch
      @item-toggle="clickHandler"
      size="large"
    ></v-jstree>

    <pre>{{ data }}</pre>
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
        .then((res) => {
          const response = res.data.response;
          this.data = response.map((res) => {
            return {
              id: res.divisionId,
              divisionId: res.divisionId,
              text: res.name,
              level: "division",
              children: [{}],
            };
          });
        })
        .catch((error) => {
          alert(error.response.error);
        });
    },
    getSSG(divisionId) {
      if (!divisionId) return;
      instance
        .get(`/ssg/${divisionId}`)
        .then((res) => {
          const response = res.data.response;
          let localData = this.data;
          const idx = localData.findIndex(
            (ele) => ele.divisionId == divisionId
          );
          this.data[idx].children = response;
          localStorage.setItem("data", this.data);
        })
        .catch((error) => {
          alert(error);
        });
    },
    getFRE(ssgId) {
      instance
        .get(`/ssg/${ssgId}`)
        .then((res) => {
          const response = res.data.response;

          console.log(response);
        })
        .catch((error) => {
          alert(error.response.error);
        });
    },

    clickHandler(node, item) {
      if (item.level == "division") {
        this.getSSG(item.divisionId);
      } else if (item.level == "ssg") {
        this.getFRE(item.ssgId);
      }
    },
  },
};
</script>
