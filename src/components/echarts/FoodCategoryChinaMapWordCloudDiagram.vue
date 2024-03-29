<script setup>
import dishes from './data/foods.json'
import {Vegetables, Rice, HotPot, Barbecue, BowlOne} from "@icon-park/vue-next";
import * as echarts from 'echarts';
import 'echarts-wordcloud';
// 词语框框图片
const maskImage = new Image();
maskImage.src = 'src/assets/china.png'
const dishValue = dishes['value'];
let dishClean = []
Object.keys(dishValue).map(key => {
  dishClean.push(dishValue[key].map(dishName=>{return {name: dishName, value: Math.round(Math.random() * 160)}}));
})
onMounted(()=>{
  // dishClean.map((category, index)=>{
  //   graphInit(category, index)
  // })
  graphInit(dishClean[1], 5)
})
onUnmounted(()=>{
  window.onresize = null
})

const graphInit = (clearedData, index)=>{
  let myChart = echarts.init(document.getElementById(`draw-${index}`))
  window.onresize = function () {
    myChart.resize();
  };
  const option = {
    tooltip: {},
    series: [{
      type: 'wordCloud',   //类型
      shape: 'circle',

      // Keep aspect ratio of maskImage or 1:1 for shapes
      // This option is supported from echarts-wordcloud@2.1.0
      keepAspect: false,
      // maskImage: maskImage,
      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%',
      right: null,
      bottom: null,
      sizeRange: [12, 60],     //字体大小范围
      rotationRange: [-90, 90],
      rotationStep: 1,
      gridSize: 8,
      drawOutOfBound: false,
      shrinkToFit: true,
      textStyle: {                  //随机获取样式
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          // Random color
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      data: clearedData     //数据源为数组eg:[{name:'中国',value:124}]
    }]
  }
  myChart.setOption(option);
}

</script>

<template>
  <div class="food-category-china-map-word-cloud-diagram-wrapper">
<!--    <el-tabs type="border-card">-->
<!--      <el-tab-pane>-->
<!--        <template #label>-->
<!--          <span class="custom-tabs-label">-->
<!--            <HotPot theme="outline" size="14" fill="#5cd9e8"/>-->
<!--            <span>热菜</span>-->
<!--          </span>-->
<!--        </template>-->
<!--        <div class="china-chart-draw" id="draw-0"/>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane>-->
<!--        <template #label>-->
<!--          <span class="custom-tabs-label">-->
<!--            <Vegetables theme="outline" size="14" fill="#5cd9e8"/>-->
<!--            <span>凉菜</span>-->
<!--          </span>-->
<!--        </template>-->
<!--        <div class="china-chart-draw" id="draw-1"/>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane>-->
<!--        <template #label>-->
<!--          <span class="custom-tabs-label">-->
<!--            <BowlOne theme="outline" size="14" fill="#5cd9e8"/>-->
<!--            <span>汤羹</span>-->
<!--          </span>-->
<!--        </template>-->
<!--        <div class="china-chart-draw" id="draw-2"/>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane>-->
<!--        <template #label>-->
<!--          <span class="custom-tabs-label">-->
<!--            <Rice theme="outline" size="14" fill="#5cd9e8"/>-->
<!--            <span>主食</span>-->
<!--          </span>-->
<!--        </template>-->
<!--        <div class="china-chart-draw" id="draw-3"/>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane>-->
<!--        <template #label>-->
<!--          <span class="custom-tabs-label">-->
<!--            <Barbecue theme="outline" size="14" fill="#5cd9e8"/>-->
<!--            <span>小吃</span>-->
<!--          </span>-->
<!--        </template>-->
<!--        <div class="china-chart-draw" id="draw-4"/>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
    <div>
      <div class="china-chart-draw" id="draw-5"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-tabs-label{
  display: flex;
  align-items: center;
}
.china-chart-draw{
  width: 100%;
  max-width: 500px;
  height: 300px;
}

:deep(.el-tabs__item:hover){
  color: #7ed2e1 !important;
}
:deep(.el-tabs__item.is-active){
  color: #7ed2e1 !important;
}
//:deep(.china-chart-draw div){
//  height: 300px !important;
//  width: 500px !important;
//}
</style>