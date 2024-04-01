<script setup>
import * as echarts from 'echarts'

const prop = defineProps({
  carbonFatProteinFiber: Array
})

const requiredIntake = [
    // 2000, // 总能量需求
    300, // 碳水需求
    70, // 蛋白质需求
    60, // 脂肪需求
    25 // 纤维素需求
]

function drawChart() {
  // 基于准备好的dom，初始化echarts实例
  let myChartPieLeft = echarts.init(
      document.getElementById("daily-intake-food-nutrition-bar")
  );
  //  ----------------------------------------------------------------
  let category = [
    // "热量",
    "碳水化合物",
    "脂肪",
    "蛋白质",
    "纤维素"
  ];

  let lineData = prop.carbonFatProteinFiber
  let barData = requiredIntake.map(item=>item);
  let ratio = lineData.map((item, index)=>{
    return (item/barData[index]).toFixed(2);
  })

  let option = {
    title: {
      text: "",
      x: "center",
      y: 0,
      textStyle: {
        color: "#B4B4B4",
        fontSize: 16,
        fontWeight: "normal"
      }
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255,255,255,0.1)",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
          backgroundColor: "#7B7DDC"
        }
      }
    },
    legend: {
      data: ["每100g包含营养价值", "每日推荐摄入", "每100g完成供给率"],
      textStyle: {
        color: "#B4B4B4"
      },
      top: "0%"
    },
    grid: {
      x: "8%",
      width: "88%",
      y: "4%"
    },
    xAxis: {
      data: category,
      axisLine: {
        lineStyle: {
          color: "#B4B4B4"
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4"
          }
        },

        axisLabel: {
          formatter: "{value} "
        }
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4"
          }
        },
        axisLabel: {
          formatter: "{value} "
        }
      }
    ],
    series: [
      {
        name: "每100g完成供给率",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: "#F02FC2"
          }
        },
        data: ratio
      },

      {
        name: "每日推荐摄入",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#956FD4" },
              { offset: 1, color: "#3EACE5" }
            ])
          }
        },
        data: barData
      },

      {
        name: "每100g包含营养价值",
        type: "bar",
        barGap: "-100%",
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(156,107,211,0.8)" },
              { offset: 0.2, color: "rgba(156,107,211,0.5)" },
              { offset: 1, color: "rgba(156,107,211,0.2)" }
            ])
          }
        },
        z: -12,

        data: lineData
      }
    ]
  };
  myChartPieLeft.setOption(option);
  // -----------------------------------------------------------------
  // 响应式变化
  window.addEventListener("resize", () => myChartPieLeft.resize(), false);
}

onMounted(()=>{
  drawChart();
})
// TODO 视图更新时setOption更新一下dom
onUpdated(()=>{

})
onUnmounted(()=>{
  window.onresize = null
})

</script>

<template>
  <div id="daily-intake-food-nutrition-bar"/>
</template>

<style scoped>
#daily-intake-food-nutrition-bar{
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>