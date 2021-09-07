<template>
  <div class="mt-20 px-8">
    <h1>Tree Structure</h1>
    <vue-tree-list
      :model="data"
      @click="clickHandler"
      @toggle="toggleHandler"
      default-tree-node-name="new node"
      default-leaf-node-name="new leaf"
      v-bind:default-expanded="false"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <span class="capitalize">
          {{ slotProps.model.name }}
        </span>
      </template>
      <span class="icon" slot="treeNodeIcon">
        <span class="mx-2">📂</span>
      </span>
      <span class="icon" style="display: none" slot="addTreeNodeIcon">📂</span>
      <span class="icon" style="display: none" slot="addLeafNodeIcon">＋</span>
      <span class="icon" slot="editNodeIcon">
        <button
          class="px-2 text-xs py-1 rounded mx-1 bg-blue-400 text-blue-100"
        >
          Edit
        </button>
      </span>
      <span class="icon" slot="delNodeIcon"> ❌ </span>
    </vue-tree-list>

    <pre>{{ rawData }}</pre>
  </div>
</template>
<script>
import { VueTreeList, Tree, TreeNode } from "vue-tree-list";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/data",
});

export default {
  components: {
    VueTreeList,
  },
  created() {
    this.getDivision();
  },
  data() {
    return {
      data: new Tree([]),
      rawData: [],
    };
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
              children: [{}],
            };
          });
          this.data = new Tree(localData);
          this.rawData = localData;
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
          const idx = this.rawData.findIndex(
            (ele) => ele.divisionId == divisionId
          );
          this.rawData[idx].children = response;
          this.data = new Tree(this.rawData);
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

    clickHandler(item) {
      item.toggle();

      if (item.level == "division") {
        this.getSSG(item.divisionId);
      } else if (item.level == "ssg") {
        this.getFRE(item.ssgId);
      }
    },
    toggleHandler(item) {
      console.log(item);
    },
  },
};
</script>
