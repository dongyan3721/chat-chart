<script setup>

import {Plus, Scissor} from "@element-plus/icons-vue";
import {genFileId} from "element-plus";
import {VueCropper} from "vue-cropper";
import {dishRecognization} from "@/web-api/dish-recognization.js";

let dialogUploadFileList = ref([{
  name: 'test.png',
  url: 'https://n.sinaimg.cn/sinacn23/258/w641h417/20180905/78f7-hitesuy8218027.jpg'
}])


// 控制是否需要替换，el-upload是默认上传后直接填在框里的
let replaceOriginalAvatarFlag = ref(false)

// 文件上传量超出
const handleExceed = (files) => {
  if(!replaceOriginalAvatarFlag.value){
    cropOptions.img = URL.createObjectURL(files[0]);
    cropVis.value = true
    return
  }
  bodyUploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  bodyUploadRef.value.handleStart(file)
}

// 上传图片删除
const handleAvatarRemove = (file)=>{
  recordWhetherAvatarHadBeenModified.value = false
}

// 处理裁剪
const handleAvatarInitialUpload = (ev)=>{
  cropOptions.img = URL.createObjectURL(ev.raw);
  cropVis.value = true
  dialogUploadFileList.value = []
}
// 拒绝删除
const handleRejectRemove = file=>{
  return false
}

// 记录上传的图片是否最终被改动
let recordWhetherAvatarHadBeenModified = ref(false)

// 上传框引用
let bodyUploadRef = ref()

// 裁剪框的配置
let cropOptions = reactive({
  img: '', // 裁剪图片的地址 url 地址, base64, blob
  outputSize: 1, // 裁剪生成图片的质量
  outputType: 'png', // 裁剪生成图片的格式 jpeg, png, webp
  info: false, // 裁剪框的大小信息
  canScale: true, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 150, // 默认生成截图框宽度
  autoCropHeight: 150, // 默认生成截图框高度
  fixedBox: false, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的狂宽高比例就不固定了
  fixedNumber: [1, 1], // 截图框的宽高比例 [ 宽度 , 高度 ]
  canMove: true, // 上传图片是否可以移动
  canMoveBox: true, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  full: true, // 是否输出原图比例的截图
  enlarge: '1', // 图片根据截图框输出比例倍数
  mode: 'contain' // 图片默认渲染方式 contain , cover, 100px, 100% auto
})

let cnt = ref(0)
// 裁剪框可见性
let cropVis = ref(false);
// 裁剪框引用
let cropperRef = ref()
const handleCloseCropDialog = ()=>{
  cropVis.value = false
  cnt = ref(++cnt.value)
}

const rotateLeft = () => {
  // 这个默认是旋转90度的，官网有说明
  // 后面会完善不要让这个一下子旋转90度的代码
  cropperRef.value.rotateLeft()
}
// 预览框内图像src
let previewUrl = ref();
// 是否预览
let showPreview = ref(false)
// 向右旋转
const rotateRight = () => {
  // 这个默认也是旋转90度的，官网有说明
  // 后面会完善不要让这个一下子旋转90度的代码
  cropperRef.value.rotateRight()
}
// 获取图片，在预览框内加载
const getCropDataBase64 = () => {
  // 这个是获取base64的图片
  cropperRef.value.getCropData((data) => {
    previewUrl.value = data;
    showPreview.value = true
  })
}
// 将确认上传的新图片放在缓冲区
const transferUploadedToBuffer = ()=>{
  recordWhetherAvatarHadBeenModified.value = true
  dialogUploadFileList.value = [
    {
      name: 'newAvatar.png',
      url: previewUrl.value
    }
  ]
  cropVis.value = false;
  const data = {
    image: previewUrl.value.split(",")[1],
    top_num: 2,
    baike_num: 1
  }
  dishRecognization(data).then(res=>{
    const result = res.result;
    dish.dishName = result[0].name;
    dish.calorie = result[0].calorie
    dish.nutrient = "营养营养营养营养营养"
    dish.advice = "建议建议建议建议建议建议建议建议"
  })
}
// 控制页面内预览对话框可见性
let bodyPreviewDialogVis = ref(false);
let dialogImageHeight = ref()
let dialogImageWidth = ref()
let bodyPreviewDialogWidth = ref()
// 关闭主页面预览对话框
const handleBodyPreviewDialogClose = ()=>{
  bodyPreviewDialogVis.value = false
}
//
const handlePictureCardPreview = () => {
  // 固定对话框高度为50，宽度成比例
  adjustDialogImageWidthAndHeight()
  bodyPreviewDialogVis.value = true
}
// 动态调整预览框大小
function adjustDialogImageWidthAndHeight() {
  // console.log(fileList.value[0])
  let imageUrl = dialogUploadFileList.value[0].url;
  let image = new Image();
  image.src = imageUrl;
  dialogImageHeight.value = `${image.height}px`
  dialogImageWidth.value = `${image.width}px`;
  bodyPreviewDialogWidth.value = `${image.width + 50}px`
}

let dish = reactive({
  calorie: null,
  dishName: null,
  nutrient: null,
  advice: null
})

</script>

<template>
  <div id="dish-wrapper">
    <div id="dish-recognize">
      <!--主页面内图片预览对话框-->
      <el-dialog v-model="bodyPreviewDialogVis" @close="handleBodyPreviewDialogClose" :width="bodyPreviewDialogWidth" append-to-body>
        <img :src="dialogUploadFileList[0].url" alt="preview" :height="dialogImageHeight" :width="dialogImageWidth"/>
        <template #header><span style="color: #666666">图片预览</span></template>
      </el-dialog>
      <el-dialog v-model="cropVis" @close="handleCloseCropDialog" width="600px" append-to-body>
        <template #header>
          <!--      <template #header style="display: flex; align-items: center; justify-content: flex-start;">-->
          <el-icon color="#666666" size="large">
            <Scissor/>
          </el-icon>
          <span style="color: #666666">图片上传裁剪</span>
        </template>
        <el-row>
          <VueCropper style="min-width: 560px; min-height: 300px" ref="cropperRef" :img="cropOptions.img" :outputSize="cropOptions.outputSize"
                      :outputType="cropOptions.outputType" :info="cropOptions.info" :canScale="cropOptions.canScale" :autoCrop="cropOptions.autoCrop"
                      :autoCropWidth="cropOptions.autoCropWidth" :autoCropHeight="cropOptions.autoCropHeight" :fixedBox="cropOptions.fixedBox"
                      :fixed="cropOptions.fixed" :fixedNumber="cropOptions.fixedNumber" :canMove="cropOptions.canMove" :canMoveBox="cropOptions.canMoveBox"
                      :original="cropOptions.original" :centerBox="cropOptions.centerBox" :infoTrue="cropOptions.infoTrue" :full="cropOptions.full"
                      :enlarge="cropOptions.enlarge" :mode="cropOptions.mode" :key="cnt">
          </VueCropper>
        </el-row>
        <el-row style="width: 100%; height: 60px; margin-top: 10px;">
          <el-button type="primary" plain @click="rotateLeft">←向左旋转图片</el-button>
          <el-button type="primary" plain @click="rotateRight">向右旋转图片→</el-button>
          <el-button type="primary" @click="getCropDataBase64">获取截取的图片</el-button>
        </el-row>
        <hr>
        <div>照片预览</div>
        <div style="width: 600px; height: auto; display: flex; align-items: center; justify-content: center">
          <!-- 若图片只设置宽度，可以保持等比例展示图片 -->
          <img :src="previewUrl" style="width: 50px; height: 50px" alt="preview" v-show="showPreview">
          <div v-show="!showPreview">
            <img src="@/assets/observe.png" alt="observe" height="44" width="88"/>
            <span>还没有选择图片哦</span>
          </div>
        </div>
        <template #footer>
          <el-button type="primary" @click="transferUploadedToBuffer" :disabled="!showPreview">确定</el-button>
        </template>
      </el-dialog>
      <el-upload
          v-model:file-list="dialogUploadFileList"
          ref="bodyUploadRef"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-exceed="handleExceed"
          :on-remove="handleAvatarRemove"
          :on-change="handleAvatarInitialUpload"
          :before-remove="handleRejectRemove"
          :auto-upload="false"
          :limit="1">
        <template #default>
          <el-icon><Plus/></el-icon>
        </template>
      </el-upload>
    </div>
    <div id="dish-recognize-info">
      <div>菜品名称：{{dish.dishName}}</div>
      <div>热量计数：{{dish.calorie}}</div>
      <div>营养分析：{{dish.nutrient}}</div>
      <div>优化建议：{{dish.advice}}</div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-dialog__header) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#dish-wrapper{
  display: flex;
}
#dish-wrapper #dish-recognize-info{
  display: flex;
  padding: 0 0 0 20px;
  flex-direction: column;
}
</style>