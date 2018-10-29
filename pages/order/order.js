// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    userInfo:{},
    orderList:[],
  },



  payorder: function (e) {
    var orderid = e.target.dataset.id;
    wx.setStorageSync('orderid', orderid)
    uctooPay.generateOrder();
  },

  switchSlider: function (e) {
    var that = this;
    that.setData({
      current: e.target.dataset.index
    })
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/order/list.shtml',
      data: {
        account: that.data.userInfo.account,
        status: e.target.dataset.index - 1
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            orderList: res.data.orderList
          })
        } else {
          console.log(res.data.msg)
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  changeSlider: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  

  /**
   * 点击订单查看详情
   */
  toOrderDetail: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/order/list.shtml',
      data: {
        account: userInfo.account
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if(res.data.code == 0){
          that.setData({
            orderList: res.data.orderList
          })
        }else{
          console.log(res.data.msg)
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})