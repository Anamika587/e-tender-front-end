<template>
  <div class="w-full h-full grid grid-cols-4 h-screen">
    <div class="col-span-4 md:col-span-2"></div>
    <div class="col-span-4 md:col-span-2">
      <ExcelUpdate />
    </div>
  </div>
</template>

</template>

<script>
import ExcelUpdate from "../components/ExcelUpdate.vue";
export default {
  components: { ExcelUpdate },
};
</script>

<style>
</style>