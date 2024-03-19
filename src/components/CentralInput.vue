<script setup>
import {Search} from "@element-plus/icons-vue";

const value = defineModel()
const props = defineProps({
  width: Number
})
let calcWidth = computed(()=>{
  return `width: ${props.width}px`
})
const emit = defineEmits(['search'])
const triggerSearch = (ev)=>{
  emit('search', ev)
}
</script>

<template>
  <div class="input-group" :style="calcWidth">
    <input v-model="value" type="text" autocomplete="off" class="input-group-addon">
    <el-icon size="24" color="606266" class="search-button"><Search @click="triggerSearch"/></el-icon>
  </div>
</template>

<style scoped>
.input-group{
  height: 38px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 -2px 4px rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  padding: 0 15px;
  background: #fff;
}
.input-group-addon{
  width: 80%;
  border: none;
  background: none;
}
.input-group-addon:focus{
  outline: none;
}
.search-button:hover{
  cursor: pointer;
}
</style>