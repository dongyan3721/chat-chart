<script setup>
import {NAvatar} from "naive-ui";


const props = defineProps({
  isHost: Boolean
})
</script>

<template>
  <div v-if="!isHost" class="avatar-head">
    <NAvatar src="src/assets/assistant.svg" size="small" round>
      <template #fallback>
        <span>预览失败</span>
      </template>
    </NAvatar>
    <span style="margin: 0 0 0 10px; font-weight: bold; color: #fafafa">物语小智</span>
  </div>
  <div v-else class="avatar-head">
    <NAvatar src="src/assets/me.svg" size="small" round>
      <template #fallback>
        <span>预览失败</span>
      </template>
    </NAvatar>
    <span style="margin: 0 0 0 10px; font-weight: bold; color: #fafafa">我</span>
  </div>
</template>

<style scoped>
.avatar-head {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px;
}
</style>