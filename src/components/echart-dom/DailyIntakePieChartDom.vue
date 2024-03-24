<script setup>
import DailyIntakePieChart from "@/components/echarts/DailyIntakePieChart.vue";
import {ChartProportion} from "@icon-park/vue-next";
const intake = [
    235, 281, 152, 138, 250, 0, 42
]

</script>

<template>
  <div class="table-title" style="padding: 0 0 10px 10px">
    <chart-proportion theme="outline" size="20" fill="#fff"/>
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