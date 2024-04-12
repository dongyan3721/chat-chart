<script setup>
import DailyHumberIntakeLinePieChartDom from "@/components/echart-dom/DailyHumberIntakeLinePieChartDom.vue";
import DailyIntakePieChartDom from "@/components/echart-dom/DailyIntakePieChartDom.vue";
import DishRecognization from "@/components/echart-dom/DishRecognization.vue";
import MyAppetiteAndDishPreference from "@/components/echart-dom/MyAppetiteAndDishPreference.vue";
import RecommendedCommodities from "@/components/echart-dom/RecommendedCommodities.vue";
import RecommendedIntakePieChartDom from "@/components/echart-dom/RecommendedIntakePieChartDom.vue";
import CurrentTime from "@/components/CurrentTime.vue";
import FoodCategoryChinaMapWordCloudDiagram from "@/components/echart-dom/FoodCategoryChinaMapWordCloudDiagram.vue";
let loading = ref(true)
function cancelLoading() {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
onMounted(()=>{
  cancelLoading()
})
</script>

<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
<!--      <div class="host-body">-->
        <div style="display: flex; justify-content: center">
          <dv-decoration-10 style="width:33.3%;height:5px;" />
          <div style="display: flex; justify-content: center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
            <div class="title">
              <span class="title-text">智能饮食规划</span>
              <dv-decoration-6
                  class="title-bottom"
                  :reverse="true"
                  :color="['#50e3c2', '#67a1e5']"
                  style="width:250px;height:8px;"
              />
            </div>
            <dv-decoration-8
                :reverse="true"
                :color="['#568aea', '#000000']"
                style="width:200px;height:50px;"
            />
          </div>
          <dv-decoration-10 style="width:33.3%;height:5px;" />
        </div>

        <!-- 第二行 -->
        <!--TODO 导航条栏-->
        <div style="display: flex; justify-content: space-between">
          <div class="d-flex" style="width: 40%">
            <div
                class="react-right ml-4"
                style="width: 500px; text-align: left;background-color: #0f1325;"
            >
              <span class="react-before"></span>
              <span class="text fw-b"></span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue fw-b"></span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left mr-3" style="background-color: #0f1325;">
              <span class="text colorBlue fw-b"></span>
            </div>
            <div class="react-left mr-4" style="width: 500px; background-color: #0f1325; text-align: right;">
              <span class="react-after"></span>
              <CurrentTime class="text fw-b"/>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12 style="padding: 10px">
                <DailyIntakePieChartDom/>
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12 style="padding: 10px">
                <FoodCategoryChinaMapWordCloudDiagram/>
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <MyAppetiteAndDishPreference/>
            </div>
            <div>
              <dv-border-box-13 style="padding: 10px">
                <RecommendedCommodities/>
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
            <dv-border-box-13 style="padding: 10px">
              <DishRecognization/>
            </dv-border-box-13>
            <dv-border-box-12 style="padding: 10px">
              <DailyHumberIntakeLinePieChartDom/>
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/index.scss";
</style>