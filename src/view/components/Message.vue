<script setup>
import MarkdownIt from 'markdown-it'
import DoMarkdownItOptions from '@digitalocean/do-markdownit'
import hljs from "highlight.js";
import Avatar from "@/view/components/Avatar.vue";


const md = new MarkdownIt({
  highlight(code, language) {
    console.log(code)
    console.log(language)
    return highlightBlock(hljs.highlight(code, { language: language }).value, language)
  }
});

function highlightBlock(str, lang) {
  return `
<pre class="code-block-wrapper">
    <div class="code-block-header">
        <span class="code-block-header__lang">${lang}</span>
<!--        <span class="code-block-header__copy">复制代码</span>-->
    </div>
    <code class="hljs code-block-body ${lang}">${str}</code>
</pre>`
}

md.use(DoMarkdownItOptions)

const props = defineProps({
  text: String,
  isPlainText: Boolean
})

const isHost = computed(() => props.isPlainText)

let labelTextIn = computed(()=>{
  return md.render(props.text)
})


</script>

<template>
  <Avatar :is-host="isHost"/>
  <div class="message">
    <div class="markdown-body" v-html="labelTextIn" v-if="!isPlainText"/>
    <div v-text="text" class="plain-text-body" v-else/>
  </div>
  <div class="message-footer" v-if="!isPlainText">
    <span style="color: #76787d; font-size: 12px">警告：本信息由AI生成，请注意甄别。</span>
  </div>
</template>

<style lang="less">
@import url(./message.less);
.message-footer{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>