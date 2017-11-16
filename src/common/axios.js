import axios from 'axios'
import qs from 'qs'

export default function(url,data,params,headers,method='get'){
    // let baseURL='http://192.168.1.34:8088/';
    let baseURL='http://47.93.185.205:8082/maijiabangReport-1.0-SNAPSHOT/';
    // let baseURL='http://47.95.233.255:8082/maijiabangReport-1.0-SNAPSHOT/';
    let token=localStorage.token;
    if(token==undefined||token==''){
        token=''
    }
    data.platform = 3;
    data.requestTime = new Date().getTime();
    data.uniqueId = '';
    data.versionName = '';
    data.systemVerion = '';
    data.phoneBand = '';
    data.token = token;
        
    return axios({
        url:url,
        baseURL:baseURL,
        responseType:'json',
        data:qs.stringify({d:JSON.stringify(data)}),
        params:params,
        timeout:15000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method:method,  
        withCredentials:true
    })
}