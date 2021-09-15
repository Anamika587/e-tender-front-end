<template>
  <v-dialog v-if="item.ssgId" v-model="editDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        small
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
        <v-btn color="blue darken-1" text @click="editDialog = false">
          Close
        </v-btn>
        <Pop  :item="item" :reservePrice="reservePrice" :emd="emd"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Pop from '../components/Pop.vue'

export default {
  components:{
    Pop
  },
  methods:{
    defaultValue(item) {
      console.log(item);
      this.reservePrice = item.reservePrice;
      this.emd = item.emd;
    },
    close(){
      console.log("here")
      this.editDialog = false
    }
  },
  data() {
    return {
      editDialog: false,
      reservePrice: 0,
      emd: 0,
    };
  },
  props: {
    item: Object,
  },
};
</script>