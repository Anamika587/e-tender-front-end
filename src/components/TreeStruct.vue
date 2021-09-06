<template>
  <div class="TreeStruct">
    <h1>Tree Structure</h1>
    <v-jstree
      :data="data"
      multiple
      allow-batch
      whole-row
      @item-click="itemClick"
      @item-toggle="toggleHandle"
    ></v-jstree>
  </div>
</template>
<script>
import VJstree from "vue-jstree";

export default {
  components: {
    VJstree,
  },
  data() {
    return {
      data: [
        {
          text: "Same but with checkboxes",
          children: [
            {
              text: "initially selected",
              selected: true,
            },
            {
              text: "custom icon",
              icon: "fa fa-warning icon-state-danger",
            },
            {
              text: "initially open",
              icon: "fa fa-folder icon-state-default",
              opened: true,
              children: [
                {
                  text: "Another node",
                },
              ],
            },
            {
              text: "custom icon",
              icon: "fa fa-warning icon-state-warning",
            },
            {
              text: "disabled node",
              icon: "fa fa-check icon-state-success",
              disabled: true,
            },
          ],
        },
        {
          text: "Same but with checkboxes",
          opened: true,
          children: [
            {
              text: "initially selected",
              selected: true,
            },
            {
              text: "custom icon",
              icon: "fa fa-warning icon-state-danger",
            },
            {
              text: "initially open",
              icon: "fa fa-folder icon-state-default",
              opened: true,
              children: [
                {
                  text: "Another node",
                },
              ],
            },
            {
              text: "custom icon",
              icon: "fa fa-warning icon-state-warning",
            },
            {
              text: "disabled node",
              icon: "fa fa-check icon-state-success",
              disabled: true,
            },
          ],
        },
        {
          text: "And wholerow selection",
        },
      ],
    };
  },

  methods: {
    itemClick(node) {
      console.log(node.model.text + " clicked !");
    },
  },
  toggleHandle(node, item) {
    console.log("node:", node);
    console.log("item:", item);
  },
};
</script>
