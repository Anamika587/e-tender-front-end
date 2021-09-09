<template>
  <v-treeview
    v-model="tree"
    :open.sync="initiallyOpen"
    :items="items"
    activatable
    item-key="name"
    open-on-click
    :load-children="clickHandler"
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? "mdi-folder-open" : "mdi-folder" }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
    <template v-slot:label="{ item }">
      <div>{{ item.name }}</div>
    </template>
    <template v-slot:append="{ item }">
      <PopEdit :item="item" />
    </template>
  </v-treeview>
</template>

<script>
import axios from "axios";
import PopEdit from "../components/PopEdit.vue";
const instance = axios.create({
  baseURL: "http://localhost:3000/data",
});
export default {
  components: {
    PopEdit,
  },
  data: () => ({
    initiallyOpen: [],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      home: "mdi-home",
    },
    tree: [],
    on: false,
    items: [
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "home",
              },
            ],
          },
          {
            name: "favicon.ico",
            file: "png",
          },
          {
            name: "index.html",
            file: "html",
          },
        ],
      },
    ],
  }),
  created() {
    this.getDivision();
  },
  methods: {
    getDivision() {
      instance
        .get("/division")
        .then((res) => {
          const response = res.data.response;
          const localData = response.map((res) => {
            return {
              id: res.divisionId,
              divisionId: res.divisionId,
              name: res.name,
              level: "division",
              children: [],
            };
          });
          this.items = localData;
          this.rawData = localData;
        })
        .catch((error) => {
          alert(error.response.error);
        });
    },
    getFRE(item) {
      const ssgID = item.ssgId;
      instance.get(`/fre/${ssgID}`).then((res) => {
        const response = res.data.response;
        const customizedResponse = response.map((ele) => {
          return {
            ...ele,
            name: "Flat no: " + ele.flatNo,
            file: "home",
          };
        });
        this.initiallyOpen.push(item.name);
        item.children.push(...customizedResponse);
      });
    },
    getSSG(item) {
      if (!item.divisionId) return;
      instance
        .get(`/ssg/${item.divisionId}`)
        .then((res) => {
          const response = res.data.response;
          // const idx = this.rawData.findIndex(
          //   (ele) => ele.divisionId == divisionId
          // );
          // this.rawData[idx].children = response;
          this.initiallyOpen = [item.name];

          item.children.push(...response);
        })
        .catch((error) => {
          alert(error);
        });
    },
    clickHandler(item) {
      if (item.level == "division") {
        this.getSSG(item);
      } else if (item.level == "ssg") {
        this.getFRE(item);
      }
    },
    defaultValue(item) {
      console.log(item);
      this.reservePrice = item.reservePrice;
      this.emd = item.emd;
    },
  },
};
</script>

<style scoped>
.left {
  padding-left: 20px;
}
</style>