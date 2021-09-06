<template>
  <div
    class="
      w-full
      h-full
      flex flex-col
      items-center
      justify-center
      bg-purple-500
      text-white
    "
  >
    <h1>Choose Excel File to Upload</h1>
    <input
      class="w-96 px-4 py-2 my-2 mx-2 block rounded border-gray-100 border"
      type="file"
      accept=".xlsx"
      name="name"
      id="file"
      ref="file"
      placeholder="name"
      @change="handleFileUpload"
    />

    <button
      v-if="isFileChoose"
      @click="uploadFile"
      class="px-4 py-2 my-2 block text-white capitalize border bg-gray-600"
    >
      upload file
    </button>

    <p class="mt-20">Please Download Following Excel File To Add Data</p>
    <div class="mt-5">
      <a
        href="assets/template/Property_Master.xlsx"
        class="px-4 py-2 border rounded capitalize"
        download="Property Master.xlsx"
      >
        click here to dowload format excel file
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  data() {
    return {
      isFileChoose: false,
      file: "",
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];

      this.isFileChoose = true;
    },
    uploadFile() {
      let formData = new FormData();
      formData.append("file", this.file);

      instance
        .post("/excel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          alert("SUCCESS!!");
        })
        .catch(function () {
          alert("FAILURE!!");
        });
    },
  },
};
</script>

<style>
</style>