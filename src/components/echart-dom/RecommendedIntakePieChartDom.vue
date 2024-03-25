<script setup>
import RecommendedIntakePieChart from '@/components/echarts/RecommendedIntakePieChart.vue'
import {ChartProportion} from "@icon-park/vue-next";

const data = ref(
    [
      {name: '谷物类', value: 300}, {name: '蔬菜类', value: 500}, {name: '水果类', value: 350}, {name: '肉类', value: 200},
      {name: '奶制品', value: 500}, {name: '薯类', value: 100}, {name: '大豆坚果类', value: 35},
      {name: '盐', value: 5}, {name: '油脂', value: 30}
    ]
)

</script>

<template>
  <div class="table-title" style="padding: 0 0 10px 10px">
    <chart-proportion theme="outline" size="20" fill="#5cd9e8"/>
    <span>膳食金字塔推荐摄入量</span>
  </div>
  <RecommendedIntakePieChart :recommended="data"/>
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