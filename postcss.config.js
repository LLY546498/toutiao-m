
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀， 用来兼容不同的浏览器
    // vuecli 已经在内部默认配置了 autoprefixer
    //   'autoprefixer': {
    //     //   用来配置要兼容到的系统（浏览器）环境
    //     // 会有控制台变异警告， 因为vuecli 是通过项目中.browserslistrc
    //     // 文件来配置要兼容的环境信息的
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    //  吧px转为rem
    'postcss-pxtorem': {
      //   转换的根元素基准值
      // 正常情况下按照你的设计稿来
      // 750 宽的设计稿 750 / 10 = 75
      // 375宽的设计稿 375 / 10 = 37.5
      rootValue: 37.5,
      // 需要转换的css属性 * 就是所有属性都要转
      propList: ['*']
    }
  }
}
