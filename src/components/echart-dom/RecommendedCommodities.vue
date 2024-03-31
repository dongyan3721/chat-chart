<template>
  <div id="recommended-commodities">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="table-title">
          <chart-proportion theme="outline" size="20" fill="#5cd9e8"/>
          <span>健康菜品推荐</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style=" width: 15vw; height:360px" />
<!--        <dv-scroll-board :config="config" style="min-width:200px; width: 15vw; height:360px" />-->
      </div>
    </div>
  </div>
</template>

<script>
import {DataLine} from "@element-plus/icons-vue";
import {ChartProportion} from "@icon-park/vue-next";

export default {
  data() {
    return {
      config: {
        header: ["组件", "分支", "覆盖率"],
        data: [
          ["组件1", "dev-1", "<span  class='colorGrass'>↑75%</span>"],
          ["组件2", "dev-2", "<span  class='colorRed'>↓33%</span>"],
          ["组件3", "dev-3", "<span  class='colorGrass'>↑100%</span>"],
          ["组件4", "rea-1", "<span  class='colorGrass'>↑94%</span>"],
          ["组件5", "rea-2", "<span  class='colorGrass'>↑95%</span>"],
          ["组件6", "fix-2", "<span  class='colorGrass'>↑63%</span>"],
          ["组件7", "fix-4", "<span  class='colorGrass'>↑84%</span>"],
          ["组件8", "fix-7", "<span  class='colorRed'>↓46%</span>"],
          ["组件9", "dev-2", "<span  class='colorRed'>↓13%</span>"],
          ["组件10", "dev-9", "<span  class='colorGrass'>↑76%</span>"]
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"]
      }
    };
  },
  components: {ChartProportion, DataLine},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#recommended-commodities {
  padding: 1rem;
  height: 410px;
  min-width: 300px;
  border-radius: 5px;
  .bg-color-black {
    height: 385px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
  }

}
.table-title{
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 10px 0;
  font-size: 1.2rem;
}
</style>