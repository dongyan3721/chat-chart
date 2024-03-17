<script setup>
import CryptoJS from "crypto-js";
import Message from "@/view/components/Message.vue";
import CentralInput from "@/components/CentralInput.vue";
import KnowledgeMap from "@/view/components/KnowledgeMap.vue";

let assistantAnswer = ref('')
let guestInput = ref('')
let sendButtonDisable = ref(false)

// 地址必须填写，代表着大模型的版本号！！！！！！！！！！！！！！！！
const httpUrl = new URL("https://spark-api.xf-yun.com/v3.5/chat");
let modelDomain; // V1.1-V3.5动态获取，高于以上版本手动指定

const APPID = 'ee2c2252'
const API_SECRET = 'NDU2NGIzZDVhZjA3NmI3YjBlMTYyODY5'
const API_KEY = '2d7efa00bc2a40ed84180604e3c1b333'



function getWebsocketUrl() {
  // console.log(httpUrl.pathname)
  // 动态获取domain信息
  switch (httpUrl.pathname) {
    case "/v1.1/chat":
      modelDomain = "general";
      break;
    case "/v2.1/chat":
      modelDomain = "generalv2";
      break;
    case "/v3.1/chat":
      modelDomain = "generalv3";
      break;
    case "/v3.5/chat":
      modelDomain = "generalv3.5";
      break;
  }

  return new Promise((resolve, reject) => {
    const apiKey = API_KEY;
    const apiSecret = API_SECRET;

    let url = 'wss://' + httpUrl.host + httpUrl.pathname;

    const host = location.host;
    const date = new Date().toUTCString();
    const algorithm = 'hmac-sha256';
    const headers = 'host date request-line';
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}


class TTSRecorder {
  constructor({
                appId = APPID
              } = {}) {
    this.appId = appId
    this.status = 'init'
  }

  // 修改状态
  setStatus(status) {
    this.status = status
  }

  // 连接websocket
  connectWebSocket() {
    this.setStatus('ttsing')
    return getWebsocketUrl().then(url => {
      let ttsWS
      if ('WebSocket' in window) {
        ttsWS = new WebSocket(url)
      } else if ('MozWebSocket' in window) {
        ttsWS = new MozWebSocket(url)
      } else {
        alert('浏览器不支持WebSocket')
        return
      }
      this.ttsWS = ttsWS
      ttsWS.onopen = e => {
        this.webSocketSend()
      }
      ttsWS.onmessage = e => {
        this.result(e.data)
      }
      ttsWS.onerror = e => {
        this.setStatus('error')
        alert('WebSocket报错，请f12查看详情')
        console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
      }
      ttsWS.onclose = e => {
        console.log(e)
      }
    })
  }


  // websocket发送数据
  webSocketSend() {
    console.log(modelDomain)
    let params = {
      "header": {
        "app_id": this.appId, "uid": "fd3f47e4-d"
      }, "parameter": {
        "chat": {
          "domain": modelDomain, "temperature": 0.8, "max_tokens": 2000
        }
      }, "payload": {
        "message": {
          "text": [
          //     {
          //   "role": "user", "content": "中国第一个皇帝是谁？"
          // }, {
          //   "role": "assistant", "content": "秦始皇"
          // },
            {
            "role": "user", "content": guestInput.value
          }]
        }
      }
    }
    guestInput.value = ''
    // console.log(JSON.stringify(params))
    this.ttsWS.send(JSON.stringify(params))
  }

  start() {
    assistantAnswer.value = ""; // 清空回答历史
    this.connectWebSocket()
  }

  // websocket接收数据的处理
  result(resultData) {
    let jsonData = JSON.parse(resultData)
    console.log(jsonData)

    // console.log(resultData)
    // 提问失败
    if (jsonData.header.code !== 0) {
      alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
      console.error(`${jsonData.header.code}:${jsonData.header.message}`)
      return
    }
    if (jsonData.header.code === 0 && jsonData.header.status === 2) {
      this.ttsWS.close()
      sendButtonDisable.value = false
    }
    messageList.value[recordMessageLength.value].text += jsonData.payload.choices.text[0].content
    // scrollToBottom();
    // window.scrollTo(0, document.querySelector(".answer-box").scrollHeight);
  }
}

let recordMessageLength = ref(0)

const beginRequestProblemFormIfly = ()=>{
  // 防短时重复输入
  if (sendButtonDisable.value) return
  // 防空按
  if (guestInput.value===''||guestInput.value===null) return;
  if (!init.value) init.value = true
  messageList.value.push({
    text: guestInput.value,
    isPlainText: true,
  })
  messageList.value.push({
    text: '',
    isPlainText: false
  })
  recordMessageLength.value = messageList.value.length-1;
  sendButtonDisable.value = true
  new TTSRecorder().start();

}


let messageList = ref([])

let init = ref(false)

</script>

<template>
  <div class="chat-knowledge">
    <div class="welcome" v-show="!init">
      <p class="ai-self-introduction">你好，我是你的健康小帮手『物语小智』</p>
      <p class="ai-enquiry">今天有什么能帮助你的呢？</p>
    </div>
    <el-row class="screen-full">
      <el-col :span="15" class="parent-full">
        <div class="left-knowledge">
          <KnowledgeMap v-if="init"/>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="right-answer">
          <div class="answer-box">
<!--            <Message :text="testMarkDown"/>-->
            <Message v-for="(item, index) in messageList" :text="item.text" :is-plain-text="item.isPlainText" :key="index"/>
          </div>
        </div>
      </el-col>
    </el-row>
<!--    <div class="input-wrapper" style="width: 100%; display: flex; justify-content: center;">-->
    <div class="answer-input">
      <!--              <el-input v-model="guestInput" placeholder="提问" style="margin: 0 10px 0 0;" :clearable="true" @keydown.enter.native="beginRequestProblemFormIfly"></el-input>-->
      <!--              <el-button type="primary" size="large" @click="beginRequestProblemFormIfly" :disabled="sendButtonDisable">发送</el-button>-->
      <CentralInput v-model="guestInput" aria-placeholder="输入以提问..." :width="600" @search="beginRequestProblemFormIfly" @keydown.enter.native="beginRequestProblemFormIfly"/>

    </div>
<!--    </div>-->
  </div>
</template>

<style scoped>
.chat-knowledge{
  background-color: rgb(23, 28, 41);
  background-image: url("src/assets/back.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.left-knowledge{
  height: 100vh;
}
.right-answer{
  /*background-color: rgba(1, 1, 1, 100%);*/
}
.answer-box{
  min-height: 80%;
  overflow: auto;
  max-height: 100vh;
}
.answer-input{
  position: fixed;
  top: 20px;
  display: flex;
  left: 60%;
  transform: translateX(-100%);
  width: 600px;
}
.welcome{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.welcome .ai-self-introduction{
  color: #f9f9f9;
  font-size: 64px;
}
.welcome .ai-enquiry{
  font-size: 56px;
  color: #f9f9f9;
}
</style>