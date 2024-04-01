<script setup>
import {Pineapple, ChartHistogramOne} from '@icon-park/vue-next'
import * as echarts from "echarts";



const config =  {
  data: [
    {
      name: "谷物类",
      value: 14312
    },
    {
      name: "蔬菜类",
      value: 9312
    },
    {
      name: "水果类",
      value: 6532
    },
    {
      name: "肉类",
      value: 6723
    },
    {
      name: "薯类",
      value: 1284
    },
    {
      name: '奶制品',
      value: 2142
    },
    {
      name: '大豆坚果',
      value: 942
    }
  ],
  unit: '克'
}
const ranking = {
  data: [
    {name: "辣椒小炒肉", value: 13}, {name: "油麦菜", value: 11},
    {name: "凉拌芹菜", value: 11}, {name: '土豆丝', value: 11}, {name: "凉拌干丝", value: 10}, {name: '盐水毛豆', value: 9},
    {name: "红烧鸡腿", value: 7}, {name: '豆芽菜', value: 6}, {name: '菠菜豆腐', value: 6}, {name: '炖牛肉', value: 6},
    {name: '排骨汤', value: 4}, {name: '红烧肉', value: 4}, {name: '凉拌秋葵', value: 3}, {name: '红烧鲫鱼', value: 3},
    {name: '酿豆腐', value: 3}, {name: '蒸鲈鱼', value: 3}, {name: '煎鸡翅', value: 2},
    {name: '白斩鸡', value: 2}, {name: '红油鳝丝', value: 1}, {name: '梅菜扣肉', value: 1},
  ],
  waitTime: 3000,
  carousel: "page",
  unit: "次",
  rowNum: 10,
  color: '#37a2da'
}

const drawRadar = sidebar=>{
  // 基于准备好的dom，初始化echarts实例
  let myChartPieLeft = echarts.init(
      document.getElementById("right-intake-finish-ratio-draw")
  );
  //  ----------------------------------------------------------------
  // Schema:
  // AQIindex,PM2.5,PM10,CO,NO2,SO2

  let recommendDailyIntake = [
      [200, 300], [300, 500], [200, 350],
      [120, 200], [50, 100], [300, 500], [25, 35]
  ]

  let monthlyIntake = config.data.map((intake, index)=>
    // 推荐最大值小于摄入量，超了
    recommendDailyIntake[index][1]*30<intake.value?intake.value/(recommendDailyIntake[index][1]*30):
        recommendDailyIntake[index][0]*30>intake.value?intake.value/(recommendDailyIntake[index][0]*30):1
  )

  var lineStyle = {
    normal: {
      width: 1,
      opacity: 0.5
    }
  };

  let option = {
    radar: {
      indicator: [
        { name: "谷物", max: 2 },
        { name: "蔬菜", max: 2 },
        { name: "水果", max: 2 },
        { name: "肉类", max: 2 },
        { name: "薯类", max: 2 },
        { name: "奶", max: 2 },
        { name: "大豆坚果", max: 2 }
      ],
      shape: "circle",
      splitNumber: 4,
      name: {
        formatter: '{value}',
        color: '#ffffff'
      },
      // legend: {
      //   bottom: 5,
      //   data: ['Beijing', 'Shanghai', 'Guangzhou'],
      //   itemGap: 20,
      //   textStyle: {
      //     color: '#fff',
      //     fontSize: 14
      //   },
      //   selectedMode: 'single'
      // },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.8)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          // color: ['#77EADF', '#26C3BE', '#6db5ed', '#428BD4'],
          opacity: 0,
          shadowBlur: 25,
          shadowColor: "#666666",
          shadowOffsetX: 0,
          shadowOffsetY: 1
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.5)"
        }
      }
    },
    series: [
      {
        name: "intake-finish-radar",
        type: "radar",
        lineStyle: lineStyle,
        data: [
          {
            value: monthlyIntake,
            symbol: "rect",
            lineStyle: {
              width: 2,
              color: 'rgba(24,198,74,0.8)'
            },
            label: {
              show: true,
              formatter: function (params) {
                console.log(params)
                return params.value.toFixed(2);
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(255,255,255)"
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.8,
                color: 'rgb(215,186,243)'
              }
            }
          }
        ],
      }
    ]
  };
  myChartPieLeft.setOption(option);
  // -----------------------------------------------------------------
  // 响应式变化
  window.addEventListener("resize", () => myChartPieLeft.resize(), false);
  //侧边栏变化
  if (sidebar) {
    myChartPieLeft.resize();
  }
}
onMounted(()=>{
  drawRadar();
})

onUnmounted(()=>{
  window.onresize = null;
})

</script>

<template>
  <div class="my-appetite-and-dish-preferences-container">
    <div class="left-intake-variety-absolute">
      <!--近七日各类营养素摄入的绝对值-->
      <div class="table-title" style="padding: 0 0 10px 10px">
        <chart-histogram-one theme="outline" size="20" fill="#5cd9e8"/>
        <span>一周内摄入营养物质</span>
      </div>
      <dv-capsule-chart :config="config" style="width: 100%; height: 40%"/>
      <div id="right-intake-finish-ratio-draw"/>
    </div>
    <div class="right-intake-finish-ratio">
      <div class="table-title">
        <Pineapple theme="outline" size="20" fill="#5cd9e8"/>
        <span>钟爱菜式TOP20</span>
      </div>
      <dv-scroll-ranking-board :config="ranking" style="height: 90%; width: 100%"/>
    </div>
  </div>
</template>

<style scoped>
.my-appetite-and-dish-preferences-container{
  min-width: 32vw;
  width: 100%;
  /*min-width: 500px;*/
  height: 420px;
  display: flex;
  /*padding: 10px;*/
  justify-content: space-around;
  align-items: center;
}
.my-appetite-and-dish-preferences-container .left-intake-variety-absolute{
  width: 60%;
  height: 98%;
  justify-content: space-between;
}
.my-appetite-and-dish-preferences-container .right-intake-finish-ratio{
  width: 40%;
  height: 98%;
}

.table-title{
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 10px 0;
}
#right-intake-finish-ratio-draw{
  width: 100%;
  height: 55%;
}
</style>