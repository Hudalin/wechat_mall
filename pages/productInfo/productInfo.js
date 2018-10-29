// pages/productInfo/productInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailgood: {},
    productIntroduce: {},
    /*应该在后台去查，这里暂时没有服务器，根据id遍历集合找商品 */
    hotgoods:[],
    /*hotgoods: [{
      more_pic: "http://img.alicdn.com/imgextra/i3/645433954/O1CN011f4yUsnzmVCYg4C_!!645433954.jpg"
    }, {
      more_pic: "http://img.alicdn.com/imgextra/i1/645433954/O1CN011f4yUs4Zt04mF6g_!!645433954.jpg"
    }],*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    console.log("optionsid:" + id);
    let list = this.data.listgood;
    var that = this;
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/product/productInfo.shtml',
        data: {
          "pid": id
        },
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res.data);
          if (res.data.code === 0) {
            res.data.product.price = res.data.product.price.toFixed(2); //数字保留两位有效数字(变成字符串类型)
            that.setData({
              detailgood: res.data.product
            })
          } else {
            that.setData({
              detailgood: "",
            })
          }
        }
      }),
      wx.request({ //页面初始化加载轮播图
      url: 'http://47.107.87.154:8080/wechat_mall/advert/getAdvertByType.shtml',
        method: "POST",
        data: {
          "type": 3
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            that.setData({
              hotgoods: res.data.data,
            })
          } else {
            that.setData({
              hotgoods: "",
            })
          }
        },
      })
  },

  /**
   * 点击跳转，查看商品详情
   */
  lookdetail: function (e) {
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: "/pages/productInfo/productInfo?id=" + lookid.id
    })
  },

  /**
   * 添加商品至购物车
   */
  addCart:function(e){
    console.log("商品pid:"+e.currentTarget.dataset.id)
  },

  /**
   * 购买商品
   */
  bugGoods:function(e){
    console.log("商品pid:" + e.currentTarget.dataset.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})