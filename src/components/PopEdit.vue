<template>
  <v-dialog v-if="item.ssgId" v-model="dialog" persistent max-width="600px">
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
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="reservePrice"
                label="Reserve Price"
                hint="Enter Updated Reserve price"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="emd"
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
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="edit(item)"> Edit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios"
const instance = axios.create({
  baseURL: "http://localhost:3000/data",
});

export default {
  data() {
    return {
      dialog: false,
      reservePrice: 0,
      emd: 0,
    };
  },
  methods: {
    edit(item) {
      this.dialog = false;
      var updateData = {
        reservePrice: parseInt(this.reservePrice),
        emd: parseInt(this.emd),
      };
      instance.patch("/ssg/" + item.ssgId, updateData).then(() => {
        console.log(item);
        item.name =
          item.text + " [RP] " + this.reservePrice + " [EMD] " + this.emd;
        item.emd = this.emd;
        item.reservePrice = this.reservePrice;
      });
    },
  },
  props: {
    item: Object,
  },
};
</script>