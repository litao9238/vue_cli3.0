// 生产环境
const proEnv = require('./config/pro.env')
// 测试环境
const uatEnv = require('./config/uat.env')
// 本地环境
const devEnv = require('./config/dev.env')

const env = process.env.NODE_ENV
let target = ''
if (env === 'production') {
  // 生产环境
  target = proEnv.hosturl
} else if (env === 'test') {
  // 测试环境
  target = uatEnv.hosturl
}else{
  // 本地环境
  target = devEnv.hosturl
}
console.log('当前环境 ---- ' + env + '\n地址为 ---- ' + target)
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    disableHostCheck: true,
    proxy: {
      // 代理标识, 即只以 '/api' 开头的接口才进行代理
      '/api': {
        // 对应自己的接口
        target: target,
        // 跨域
        changeOrigin: true,
        ws: true,
        // 接口重写, 即接口里并有 'api' 字符的情况下再用 '^/api' 把 '/api' 去掉, 这样既能有正确标识, 又能在请求接口的时候去掉标识
        // 例如接口地址为 http://192.168.5.88:8080/goods/manager/list
        // 重写后调用 axios.get('/api/goods/manager/list') 即可
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
