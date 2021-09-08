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
      <v-icon  v-if="!item.file">
        {{ open ? "mdi-folder-open" : "mdi-folder" }}
      </v-icon>
      <v-icon  v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
    <template v-slot:label="{ item }">
      <div >{{ item.name }}</div>
    </template>
    <template v-slot:append="{ item }">
       <v-dialog v-if="item.ssgId"
      v-model="dialog"
      persistent
      max-width="600px"
    >
       <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          v-on:click="defaultValue(item)"
        >
          Edit
        </v-btn>
      </template>
       <v-card>
        <v-card-title>
          <span class="text-h5">Edit Reserve and EMD price</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="reservePrice"
                  label="Reserve Price"
                  hint="Enter Updated Reserve price"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="emd"
                  label="EMD price"
                  hint="Enter Updated EMD price"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="edit(item)"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
    </template>
  </v-treeview>
</template>

<script>
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/data",
});
export default {
  data: () => ({
    reservePrice:0,
    emd:0,
    dialog:false,
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
    on:false,
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
    edit(item){
      this.dialog= false
      var updateData = {
        reservePrice: parseInt(this.reservePrice),
        emd:parseInt(this.emd) 
      }
      instance.patch("/ssg/"+item.ssgId,updateData).then(
      () => {
        console.log(item)
        item.name = item.text + " [RP] " +this.reservePrice + " [EMD] " + this.emd
        item.emd = this.emd
        item.reservePrice = this.reservePrice
      }
      )
    },
    defaultValue(item){
      console.log(item);
      this.reservePrice = item.reservePrice
      this.emd = item.emd
    }
  },
};
</script>

<style scoped>
.left {
  padding-left: 20px;
}
</style>