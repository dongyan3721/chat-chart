<script setup>
import DailyHumberIntakeLinePieChart from "@/components/echarts/DailyHumberIntakeLinePieChart.vue";
import {ChartLine} from "@icon-park/vue-next";

</script>

<template>
  <div class="table-title" style="padding: 0 0 10px 10px">
    <chart-line theme="outline" size="20" fill="#5cd9e8"/>
    <span>近期热量摄入图</span>
  </div>
  <DailyHumberIntakeLinePieChart/>
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