// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //事件处理函数
  toHome:function(){
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**
     * 下拉页面  加载
     */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 3000)
  }
})