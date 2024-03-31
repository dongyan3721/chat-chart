<script setup>
import dishes from './data/foods.json'
import {Vegetables, Rice, HotPot, Barbecue, BowlOne, Helpcenter} from "@icon-park/vue-next";
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
  myChart = echarts.init(document.getElementById('my-tabs-body-draw'))
  window.onresize = function () {
    myChart.resize();
  };
  myChart.setOption(echartsOption)
})
onUnmounted(()=>{
  window.onresize = null
})
let myChart

let echartsOption = reactive({
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
    data: dishClean[0]     //数据源为数组eg:[{name:'中国',value:124}]
  }]
})


let isActive = ref([true, false, false, false, false])
let foodType = ['热菜', '凉菜', '主食', '汤羹', '小吃']
let isActiveNow = ref(0)
let activeTab = ref('my-tabs-header-items is-selected')
let indifferentTab = ref('my-tabs-header-items')
const handleTabClicked = (ev)=>{
  let activeSelect
  if (ev.target.nodeName==='SPAN') {
    activeSelect = parseInt(ev.target.parentNode.id.split('-').slice(-1)[0])
  }else if(ev.target.nodeName==='path') {
    activeSelect = parseInt(ev.target.parentNode.parentNode.parentNode.parentNode.id.split('-').slice(-1)[0])
  }else if(ev.target.nodeName==='SVG') {
    activeSelect = parseInt(ev.target.parentNode.parentNode.id.split('-').slice(-1)[0])
  }else{
    activeSelect = parseInt(ev.target.id.split('-').slice(-1)[0])
  }

  // 重复选择
  if (isActive.value[activeSelect]) return
  isActive.value[activeSelect] = true
  isActive.value[isActiveNow.value] = false
  isActiveNow.value = activeSelect
  echartsOption.series[0].data = dishClean[activeSelect]
  // drawLoading.value = true
  myChart.setOption(echartsOption)
  // drawLoading.value = false
}
</script>

<template>
  <div class="food-category-china-map-word-cloud-diagram-wrapper">
    <div class="table-title" style="padding: 0 0 10px 10px">
      <helpcenter theme="outline" size="20" fill="#5cd9e8"/>
      <span>今天吃什么</span>
    </div>
    <div class="my-tabs-header">
      <div v-for="(active, index) in isActive" :id="`my-tabs-item-${index}`" :class="active?activeTab:indifferentTab" @click="handleTabClicked" :key="index">
        <span class="custom-tabs-label" v-if="foodType[index]==='热菜'">
          <HotPot theme="outline" size="14" fill="#5cd9e8"/>
          热菜
        </span>
        <span class="custom-tabs-label" v-if="foodType[index]==='凉菜'">
          <Vegetables theme="outline" size="14" fill="#5cd9e8"/>
          凉菜
        </span>
        <span class="custom-tabs-label" v-if="foodType[index]==='汤羹'">
          <BowlOne theme="outline" size="14" fill="#5cd9e8"/>
          汤羹
        </span>
        <span class="custom-tabs-label" v-if="foodType[index]==='主食'">
          <Rice theme="outline" size="14" fill="#5cd9e8"/>
          主食
        </span>
        <span class="custom-tabs-label" v-if="foodType[index]==='小吃'">
          <Barbecue theme="outline" size="14" fill="#5cd9e8"/>
          小吃
        </span>
      </div>
    </div>
    <div class="my-tabs-body">
      <div id="my-tabs-body-draw"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.food-category-china-map-word-cloud-diagram-wrapper{
  width: 30vw;
  //min-width: 500px;
  height: 380px;
  display: flex;
  flex-direction: column;
  .table-title{
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 10px 0;
    font-size: 1.2rem;
  }
  .my-tabs-header{
    display: flex;
    width: 100%;
    height: 30px;

    .my-tabs-header-items{
      width: 20%;
      height: 100%;
      background-color: rgba(240, 240, 240, 0.06);
      border-top: 1px solid #f1f1f1;
      border-bottom: 1px solid  #f1f1f1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.73);
      .custom-tabs-label{
        display: flex;
        align-items: center;
      }
    }

    .my-tabs-header-items:hover{
      color: #7ed2e1;
      transition: 0.5s;
    }

    .is-selected{
      //background-color: #f9f9f9;
      background: none;
      border-bottom: none;
      color: #7ed2e1;
    }
  }
  .my-tabs-body{
    width: 100%;
    height: 350px;
    //background-color: #fff;

    #my-tabs-body-draw{
      width: 100%;
      height: 100%;
    }
  }
}
</style>