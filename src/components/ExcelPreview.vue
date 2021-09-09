
<template>
      <ejs-spreadsheet
        ref="spreadsheet"
        :openUrl="openUrl"
        :allowOpen="true"
        :created="created"
      ></ejs-spreadsheet>
</template>

<script>
import Vue from "vue";
import { SpreadsheetPlugin } from "@syncfusion/ej2-vue-spreadsheet";
import { mapState } from "vuex";

Vue.use(SpreadsheetPlugin);
export default {
  data: () => {
    return {
      openUrl:
        "https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open",
    };
  },
  computed: mapState(["fileUploaded"]),
  methods: {
    created: function () {
      console.log(this.fileUploaded);
      var file = new File([this.fileUploaded], "Sample.xlsx"); //convert the blob into file
      this.$refs.spreadsheet.open({ file: file });
  }
  },
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-vue-spreadsheet/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-spreadsheet/styles/material.css";
</style>