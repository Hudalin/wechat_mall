var index = 0;

Page({
  data: {
    list: [],
    userInfo:{}
  },

  addAddre: function(e) {
    wx.navigateTo({
      url: '../modifyAddress/modifyAddress?type=add'
    })
  },

  toModifyAddre: function(e) {
    wx.navigateTo({
      url: '../modifyAddress/modifyAddress?id=' + e.currentTarget.dataset.id+'&type=modify'
    })
  },
  
  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function(options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/address/getAllAddressList.shtml',
      data: {
        account: userInfo.account
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            list: res.data.list
          })
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },

  flush:function (){
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/address/getAllAddressList.shtml',
      data: {
        account: userInfo.account
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            list: res.data.list
          })
        } else {
          console.log(res.data.msg)
        }
      },
    })
  }

})