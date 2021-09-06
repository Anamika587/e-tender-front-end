<template>
  <div class="mt-20 px-8">
    <h1>Tree Structure</h1>
    <v-jstree
      :data="data"
      multiple
      allow-batch
      whole-row
      @item-toggle="clickHandler"
      size="large"
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
        .then((res) => {
          const response = res.data.response;
          this.data = response.map((res) => {
            return {
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
      instance
        .get(`/ssg/${divisionId}`)
        .then((res) => {
          const response = res.data.response;

          let pgroup = response.map((pg) => {
            return {
              ssgId: pg.ssgId,
              text: pg.pgroup,
              level: "pgroup",
              children: [{}],
            };
          });

          let sector = response.map((sec) => {
            return {
              text: sec.sector,
              level: "sector",
              children: pgroup.filter((ele) => ele.text == sec.pgroup),
            };
          });

          let station = response.map((sta) => {
            return {
              text: sta.station,
              level: "station",
              children: sector.filter((ele) => ele.text == sta.sector),
            };
          });

          const idx = this.data.findIndex((d) => d.divisionId == divisionId);

          let division = this.data[idx];

          division = {
            ...division,
            children: station,
          };

          const newUpdatedValue = this.data.splice(idx, 1, division);

          this.data = newUpdatedValue;
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
