const loginTypeCheck = () => {
  // 判断是否在微信浏览器内
  uni.getProvider({
    service: 'oauth',
    success: (result) => {
      result.provider.map((value : any) => {
        let providerName = '';
        switch (value) {
          case 'weixin':
            providerName = '微信登录'
            break;
          case 'qq':
            providerName = 'QQ登录'
            break;
          case 'sinaweibo':
            providerName = '新浪微博登录'
            break;
          case 'xiaomi':
            providerName = '小米登录'
            break;
          case 'alipay':
            providerName = '支付宝登录'
            break;
          case 'baidu':
            providerName = '百度登录'
            break;
          case 'jd':
            providerName = '京东登录'
            break;
          case 'toutiao':
            providerName = '头条登录'
            break;
          case 'apple':
            providerName = '苹果登录'
            break;
          case 'univerify':
            providerName = '一键登录'
            break;
        }
        return {
          name: providerName,
          id: value
        }
      });
    },
    fail: (error) => {
      console.log('获取登录通道失败', error);
    }
  });

}


module.exports = { loginTypeCheck };