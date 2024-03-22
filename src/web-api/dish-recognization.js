import axios from 'axios';
import {ElMessage} from "element-plus";

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

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

function objectToUrlSearchParams(data) {
    const params = new URLSearchParams();
    Object.keys(params).forEach(key => {
        params.append(key, params[key]);
    })
    return params;
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
            data: objectToUrlSearchParams(config.data),
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

export function dishRecognization(data){
    return client({
        url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=24.a2c13151bcbb304380047398f72f8501.2592000.1713670889.282335-56654433',
        data,
        method: 'post'
    })
}

/**
 * 俊朗沐冥星:
 * API Key：5yKwBbup1zHBlEa1X6F4AS3u
 *
 * 俊朗沐冥星:
 * Secret Key：YaMpZBWYEVo7UXQwPUlizra2wSQ8GwoE
 */