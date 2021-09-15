<template>
    <v-dialog v-if="!item.children" v-model="confirmDialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red"
        dark
        v-bind="attrs"
        v-on="on"
        small
      >
        Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirmation</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-card-text>Are you sure you want to delete {{item.name}}</v-card-text>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="confirmDialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="edit(item)"> Delete </v-btn>
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
    },
    data(){
        return{
            confirmDialog:false,
        }
    },
    methods:{
        edit(item) {
      this.confirmDialog = false;
      if (item.freId){
      instance.delete("/fre/" + item.freId).then((res) => {
        item.name= ""

      }).catch(
          (err) => {
              alert(err)
          }
      );}
    },
    }
}
</script>