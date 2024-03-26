<script setup>
import DailyIntakePieChart from "@/components/echarts/DailyIntakePieChart.vue";
import {ChartProportion} from "@icon-park/vue-next";
const intake = [
    188, 281, 122, 108, 250, 0, 12
]

</script>

<template>
  <div class="table-title" style="padding: 0 0 10px 10px">
    <chart-proportion theme="outline" size="20" fill="#5cd9e8"/>
    <span>今日已摄入的营养</span>
  </div>
  <DailyIntakePieChart :intake="intake"/>
</template>

<style scoped>
.table-title{
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 10px 0;
}
</style>