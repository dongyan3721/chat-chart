import axios from 'axios';
import {ElMessage} from "element-plus";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const client = axios.create({
    timeout: 1000
})

function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

client.interceptors.request.use(config => {
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    // if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    if ((config.method === 'post' || config.method === 'put')) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

client.interceptors.response.use(
    res=>{
        const code = res.data.code || 200;
        if (code === 200) {
            return res.data
        }
        ElMessage.error(res.data.message)
        return Promise.reject('error')
    },
    reject =>{
        ElMessage.error('error')
        return Promise.reject('error', reject)
    }
)

export function getKnowledgeFromOwnThinking(entity){
    return client({
        url: 'https://api.ownthink.com/kg/knowledge',
        params: entity,
        method: 'get'
    })
}


export default client
