<template>
  <div class="home">
    <TreeStruct />
  </div>
</template>

<script>
// @ is an alias to /src
import TreeStruct from '@/components/TreeStruct.vue'

export default {
  name: 'Home',
  components: {
    TreeStruct
  },
  
}
</script>
