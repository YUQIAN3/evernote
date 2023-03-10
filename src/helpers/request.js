import axios from 'axios'



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL =  '//note-server.hunger-valley.com/'
axios.defaults.withCredentials = true // 允许携带cookie

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >=200 && status < 300) || status === 400
      }
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      if(res.status === 200) {
        resolve(res.data)
      }else {
        console.error(res.data)
        reject(res.data)
      }
    }).catch(err=>{
      console.error({msg: '网络异常'})
      reject({msg: '网络异常'})
    })
  })
}
