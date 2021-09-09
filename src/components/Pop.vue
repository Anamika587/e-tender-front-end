<template>
    <v-dialog  v-model="confirmDialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirmation</span>
      </v-card-title>
      <v-card-text>
        <v-container>
            <v-card-text>Updated Values</v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-card-text>[RP] {{reservePrice}}</v-card-text>
            </v-col>
            <v-col cols="12" sm="6" md="6">
            <v-card-text>[EMD] {{emd}}</v-card-text>
            </v-col>
          </v-row>
          <v-card-text>Are you sure</v-card-text>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="confirmDialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="edit(item)"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>


<script>
import axios from 'axios'
const instance = axios.create({
  baseURL: "http://localhost:3000/data",
});
export default {
    props:{
        item:{},
        reservePrice: 0,
        emd: 0,
    },
    data(){
        return{
            confirmDialog:false,
        }
    },
    methods:{
        edit(item) {
      this.confirmDialog = false;
      var updateData = {
        reservePrice: parseInt(this.reservePrice),
        emd: parseInt(this.emd),
      };

      if( updateData.reservePrice == updateData.emd){
          alert("reserve price and emd should not be same")
          return
      }

      instance.patch("/ssg/" + item.ssgId, updateData).then(() => {
        console.log(item);
        item.name =
          item.text + " [RP] " + this.reservePrice + " [EMD] " + this.emd;
        item.emd = this.emd;
        item.reservePrice = this.reservePrice;
      });
      this.$emit('close')
    },
    }
}
</script>