<template>
  <div class="main-screen">
    <div v-if="isFileUploaded" class="excel-pre-col">
      <ExcelPreview />
    </div>
    <div v-else class="excel-pre-col">
      <h1>No Preview Available...</h1>
    </div>
    <div class="file-upload-col">
      <ExcelUpdate />
    </div>
  </div>
</template>

<script>
import ExcelUpdate from "../components/ExcelUpdate.vue";
import ExcelPreview from "../components/ExcelPreview.vue";
import { mapState } from "vuex";

export default {
  components: { ExcelUpdate, ExcelPreview },
  computed: mapState(["isFileUploaded"]),
};
</script>

<style scoped>
.main-screen {
  width: 100%;
  height: 100vh;
  display: flex;
}
.excel-pre-col {
  width: 70%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.file-upload-col {
  width: 30%;
  height: 100vh;
}
</style>