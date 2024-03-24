<!--
用户当日完成摄入量雷达图（健康度评分，摄入达标为5，超出要减少）
-->
<template>
  <div>
    <div id="daily-intake-pie-chart" style="width:330px; height: 370px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {shuffleArray} from "@/utils/random.js";
export default {
  data() {
    return {
      color: [
        "#f54d4d", "#f87544", "#ffae00", "#dcff00",
        '#F4AB87', '#EEC88D', '#76CADF', '#97DA9D',
        '#88DCD8', '#FB7F89', '#F0E403', '#F576BE',
        '#ACADFF', '#7EC3FB', '#D0DB02', '#C07B11',
        '#00ACC2', '#2AAD41', '#A59D00', '#EB4747',
        '#CD0EBD', '#DE3997'
      ],
    };
  },
  props:{
    intake: Array // 列表，0-5分别对应carbohydrate/protein/fat/vegetable/milk/water属性

  },
  mounted() {
    this.drawPie();
  },
  methods: {
    randomColor(){
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    drawPie(sidebar) {
      // 基于准备好的dom，初始化echarts实例
      let myChartPieLeft = echarts.init(
          document.getElementById("daily-intake-pie-chart")
      );
      //  ----------------------------------------------------------------
      let colorRandom = shuffleArray(this.color)
      let option = {
        angleAxis: {
          interval: 1,
          type: "category",
          data: [
            "谷物",
            "蔬菜",
            "水果",
            "肉类",
            "奶制品",
            "薯类",
            "大豆坚果"
          ],
          z: 10,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#00c7ff",
            margin: 8,
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}克'
        },
        radiusAxis: {
          min: 0,
          max: 300,
          interval: 50,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#00c7ff",
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          }
        },
        legend: {
          show: true,
          orient: "vertical",
          top: "center",
          bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: "#A3E2F4",
            fontSize: 12,
            fontWeight: 0
          },
          data: ["A"]
        },
        polar: {},
        series: [
          {
            // name: "A",
            type: "bar",
            radius: ["20%", "100%"],
            data: this.intake.map((intake, index)=> {
              return {
                value: intake,
                itemStyle: {
                  normal: {
                    color: colorRandom[index]
                  }
                }
              }
            }),
            /**data: [
              {
                value: 87,
                itemStyle: {
                  normal: {
                    color: "#f54d4d"
                  }
                }
              },
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: "#f87544"
                  }
                }
              },
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: "#ffae00"
                  }
                }
              },
              {
                value: 69,
                itemStyle: {
                  normal: {
                    color: "#dcff00"
                  }
                }
              },
              {
                value: 63,
                itemStyle: {
                  normal: {
                    color: "#25d053"
                  }
                }
              },
              {
                value: 54,
                itemStyle: {
                  normal: {
                    color: "#01fff5"
                  }
                }
              }
            ], */
            coordinateSystem: "polar"
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
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style lang="scss" scoped>
</style>