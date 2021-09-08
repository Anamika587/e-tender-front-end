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
  <a href="/data" class="px-4 py-2 my-10 border rounded capitalize text-white">
    View Tree Structure
  </a>
    <h1 class="mb-5">Choose Excel File to Upload</h1>
    <input
      class="w-96 px-4 py-2 my-2 mx-2 block rounded border-white border"
      type="file"
      accept=".xlsx"
      name="name"
      id="file"
      ref="file"
      placeholder="name"
      @change="handleFileUpload"
    />

    <button
      v-if="isFileUploaded"
      @click="uploadFile"
      class="px-4 py-2 my-2 block text-white capitalize border bg-gray-600"
    >
      upload file
    </button>

    <p class="my-10">Please Download Following Excel File To Add Data</p>
    <div class="mt-5">
      <a
        href="template/Property_Master.xlsx"
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
import { mapState } from "vuex";
import { base64StringToBlob } from 'blob-util';

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  name: "ExcelUpdate",
  computed: mapState(["isFileUploaded"]),
  data() {
    return {
      file: null,
    };
  },
  methods: {
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.$store.commit("uploadedFile", this.file);
      this.$store.commit("setFileUpload");
    },
    // toBase64: (file) => new Promise((resolve, reject) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => resolve(reader.result);
    // reader.onerror = error => reject(error);
    // }),
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

<style scoped>
a {
  color: white;
}
</style>