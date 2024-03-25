<template>
  <div>
    <div id="recommended-intake-pie-chart" style="width: 15vw; min-width: 300px; height: 220px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {};
  },
  props:{
    recommended: Array // 对象数组，对象内容包括：name: 摄入项目 value: 推荐摄入值
    // carbohydrate/protein/fat/vegetable/maik/water
  },
  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie(sidebar) {
      // 基于准备好的dom，初始化echarts实例
      let myChartPieLeft = echarts.init(
          document.getElementById("recommended-intake-pie-chart")
      );
      //  ----------------------------------------------------------------

      myChartPieLeft.setOption({
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}克 ({d}%)"
        },
        toolbox: {
          show: true
        },
        calculable: true,
        legend: {
          orient: "horizontal",
          icon: "circle",
          bottom: 0,
          x: "center",
          data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6"],
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "膳食金字塔推荐摄入量",
            type: "pie",
            radius: [10, 60],
            roseType: "area",
            center: ["50%", "40%"],
            data: this.recommended
          }
        ]
      });
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