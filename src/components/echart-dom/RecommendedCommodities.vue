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
import commodities from './data/commodities.json'
import {shuffleArray} from "@/utils/random.js";

let com = shuffleArray(commodities).slice(0, 20)

export default {
  data() {
    return {
      config: {
        header: ["品名", '速览', "前往购买"],
        data: com.map(commodity => {
          return [
              commodity.name,
              `<img src="/commodities-photo/${commodity.name}.png" alt="${commodity.name}" class="inline-image">`,
              `<a href="${commodity.link}" class="commodities-jump">前往店铺</a>`
          ]
        }),
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
  //min-width: 300px;
  width: 100%;
  min-width: 16vw;
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
.commodities-jump{
  color: #f9f9f9;
}

.inline-image{
  height: 100%;
  width: 100%;
}
</style>