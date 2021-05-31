import Fetch from 'fetch-vue'

const fetch = new Fetch({
  // baseURL: 'http://10.192.233.114:8080/graphql',
  timeout: 30000,
  // 请求头
  headers: {
    'content-type': 'application/json',
    // 请求接口调用TOKEN
    'X-Amz-Security-Token': ''
  },
  /** 自定义配置, 和 具体请求时 传递的 options 会合并到一起 */
  options: {
    key1: 1,
    key2: 1
  },
  /**
   * 请求之前的拦截
   * @param {object} config 合并之后的配置
   * @param {object} customConfig 用户自定义配置
   */
  beforeRequest (config, _customConfig) {
    /** config 中 能够获取到 接口请求时 自定义传入的 options, 在这里可以处理对应的需求 */
    // console.log('beforeRequest', config.options, customConfig)
    return config
  },
  /**
   * 请求之前的拦截
   * @param {object} res 返回结果
   * @param {object} confg 合并之后的配置
   */
  beforeResponse (res, _confg) {
    /** 这里获取到 请求的信息, 一般在这里开始做业务 */
    // console.log('beforeResponse', res, confg)
    // if (res.data.code !== 200) {
    //   Promise.reject(res.data.msg)
    // }
    return res
  },
  /**
   * 请求之前的拦截
   * @param {any} e 报错信息
   * @param {object} config 合并之后的配置
   */
  responseError (e, config) {
    console.log('responseError', e, config)
  }
})

export default fetch