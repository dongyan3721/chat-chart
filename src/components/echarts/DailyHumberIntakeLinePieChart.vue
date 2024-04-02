<script setup>
import * as echarts from 'echarts';
import {shuffleArray, oneZeroRandom, getRandomValueBetween} from "@/utils/random.js";
import {generateSeriesOfDate} from "@/utils/time.js";

// const optionsData = [
//   ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
//   ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
//   ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
//   ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
//   ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
// ]

// 生成30天的数据
const LENGTH_TO_GENERATE = 30;
// 日需摄入热量
const CALORIE_NEED_PER_DAY = 2300;

// 发生随机数据
function fillOptionData(){
  let optionData = [
    ['date'],
    ['碳水化合物'],
    ['脂肪'],
    // ['*不饱和脂肪'],
    ['蛋白质'],
    ['*酒']
  ]
  optionData[0] = optionData[0].concat(generateSeriesOfDate(LENGTH_TO_GENERATE))
  // 填充依靠碳水获取的热量
  let carbon = [], fat = [], protein = [], alcohol = [] // , unFat = []
  for(let i = 0; i < LENGTH_TO_GENERATE; i++) {
    carbon.push(CALORIE_NEED_PER_DAY*getRandomValueBetween(0.50, 0.65).toFixed(2))
    let randomFatIntake = CALORIE_NEED_PER_DAY*getRandomValueBetween(0.25, 0.35).toFixed(2)
    fat.push(randomFatIntake)
    // unFat.push(randomFatIntake*getRandomValueBetween(0.30, 0.40).toFixed(2))
    protein.push(CALORIE_NEED_PER_DAY*getRandomValueBetween(0.10, 0.15).toFixed(2))
    alcohol.push(oneZeroRandom(34.21, 56.29))
  }
  optionData[1] = optionData[1].concat(carbon)
  optionData[2] = optionData[2].concat(fat)
  // optionData[3] = optionData[2].concat(unFat)
  optionData[3] = optionData[3].concat(protein)
  optionData[4] = optionData[4].concat(alcohol)

  return optionData
}

// 已经固定的要被插入的数据
const optionsData =fillOptionData()

// 计算总热量
const modify = (data)=>{
  console.log(optionsData)
  let ret = []
  for(let j=1;j<=LENGTH_TO_GENERATE;j++){
    let sum = 0;
    for(let i=1;i<=4;++i){
      // 不饱和脂肪酸已经计入脂肪
      // if (i===3) continue
      sum+=data[i][j]
    }
    ret.push(sum)
  }
  console.log(ret)
  return ret
}

const randomColor = ()=>{
  const pleasantColor = [
    '#8c02ea', '#d1be4b', '#b54089', '#1d49ac',
    '#aa6c15', '#ed4b8b', '#8190ee', '#8c1370',
    '#7e62b9', '#b8d840', '#9e29e3', '#f576be',
    "#f54d4d", "#f87544", "#ffae00", "#dcff00",
    '#F4AB87', '#EEC88D', '#76CADF', '#97DA9D',
    '#88DCD8', '#FB7F89', '#F0E403', '#F576BE',
    '#ACADFF', '#7EC3FB', '#D0DB02', '#C07B11',
    '#00ACC2', '#2AAD41', '#A59D00', '#EB4747',
    '#CD0EBD', '#DE3997'
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
    data: generateSeriesOfDate(LENGTH_TO_GENERATE),
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

</style>