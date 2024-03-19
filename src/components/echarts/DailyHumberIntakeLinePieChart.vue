<script setup>
import * as echarts from 'echarts';
import {shuffleArray} from "@/utils/random.js";

const optionsData = [
  ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
  ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
  ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
  ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
  ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
]

const modify = (data)=>{
  let ret = []
  for(let j=1;j<7;j++){
    let sum = 0;
    for(let i=1;i<5;++i){
      sum+=data[i][j]
    }
    ret.push(sum)
  }
  return ret
}

const randomColor = ()=>{
  const pleasantColor = [
    '#8c02ea', '#d1be4b', '#b54089', '#1d49ac',
    '#aa6c15', '#ed4b8b', '#8190ee', '#8c1370',
    '#7e62b9', '#b8d840', '#9e29e3', '#f576be'
  ]
  return shuffleArray(pleasantColor);
}

const options = {
  color: randomColor(),
  legend: {
    textStyle: {
      color: "#fff",
      fontSize: 12
    }
  },
  tooltip: {
    // 触发条件必须是axis
    trigger: 'axis',
    showContent: false
  },
  dataset: {
    source: optionsData
  },
  xAxis: {
    type: 'category',
    // x轴上的坐标也要加上
    data: ['2012', '2013', '2014', '2015', '2016', '2017'],
    position: "bottom",
    axisLine: true,
    axisLabel: {
      color: "rgba(255,255,255,.8)",
      fontSize: 12
    },
  },
  yAxis: {
    // gridIndex: 0,
    nameGap: 24,
    nameTextStyle: {
      color: "rgba(255,255,255,.5)",
      fontSize: 14
    },
    splitNumber: 4,

    axisLine: {
      lineStyle: {
        opacity: 0
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#fff",
        opacity: 0.1
      }
    },
    axisLabel: {
      color: "rgba(255,255,255,.8)",
      fontSize: 12
    }
  },
  grid: {
    top: '55%'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      // seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
      data: modify(optionsData),
      symbol: "emptyCircle",
      symbolSize: 8,
      markLine: {
        silent: true,
        data: [
          {
            type: "average",
            name: "平均值"
          }
        ],
        precision: 0,
        label: {
          normal: {
            formatter: "平均值: \n {c}"
          }
        },
        lineStyle: {
          normal: {
            color: "rgba(248,211,81,.7)"
          }
        }
      },
      itemStyle: {
        normal: {
          color: "#fff"
        }
      },
      lineStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              {offset: 0, color: "#1c98e8"},
              {offset: 1, color: "#28f8de"}
            ]
          },
          width: 3
        }
      },
      areaStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(35,184,210,.2)"},
              { offset: 1, color: "rgba(35,184,210,0)" }
            ]
          }
        }
      },
    },
    {
      type: 'pie',
      id: 'pie',
      center: ['50%', '25%'],
      emphasis: {
        focus: 'self'
      },
      radius: [10, 60],
      roseType: "area",
      label: {
        formatter: '{b}: {@2012} ({d}%)'
      },
      encode: {
        itemName: 'product',
        value: '2012',
        tooltip: '2012'
      },
      tooltip:{
        formatter: '{b} ({d}%)'
      }
    }
  ]
}



onMounted(()=>{
  const chart = echarts.init(document.getElementById('daily-humber-intake-line-pie-chart'));
  chart.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      chart.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  chart.setOption(options);
  window.addEventListener("resize", () => chart.resize(), false);
})

onUnmounted(()=>{
  window.onresize = null;
})

</script>

<template>
  <div>
    <div id="daily-humber-intake-line-pie-chart" style="width:800px; height: 500px;"></div>
  </div>
</template>

<style scoped>
#daily-humber-intake-line-pie-chart{
  background-color: #1a1a1a;
}
</style>