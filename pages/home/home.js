// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [],
    currentTab: 0,
    imgUrls: [], //轮播图
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    newgoods: [], //新品推荐
    hotgoods: [], //超值买
    moregoods: [], //更多精彩
  },
  /**
   * 获取最新商品和热门商品
   */
  navbarTap: function(e) {
    var that = this;
    var categoryid = e.currentTarget.dataset.idx + 1;
    wx.request({
        url: 'http://47.107.87.154:8080/wechat_mall/product/newList.shtml',
        data: {
          categoryid: categoryid
        },
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].price = res.data.data[i].price.toFixed(2);
            }
            that.setData({
              newgoods: res.data.data,
            })
          } else {
            that.setData({
              newgoods: "",
            })
          }
        },
      }),
      wx.request({
        url: 'http://47.107.87.154:8080/wechat_mall/product/hotList.shtml',
        data: {
          categoryid: categoryid
        },
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].price = res.data.data[i].price.toFixed(2);
            }
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
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 点击跳转，查看商品详情
   */
  lookdetail: function(e) {
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: "/pages/productInfo/productInfo?id=" + lookid.id
    })
  },

  /**
   * 下拉页面  加载
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      wx.hideNavigationBarLoading()
    }, 3000)
  },

  /**
   * 生命周期函数--监听页面加载 页面初始化数据
   */
  onLoad: function(options) {
    var that = this;
    wx.request({ //页面初始化加载分类
        url: 'http://47.107.87.154:8080/wechat_mall/category/getAllCategory.shtml',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          if (res.data.code === 0) {
            that.setData({
              navbar: res.data.cateItems,
            })
          } else {
            that.setData({
              navbar: ['智能路由器', '智能家庭网关', '无线中继', '其他'],
            })
          }
        },
      }),
      wx.request({ //页面初始化加载最新商品
        url: 'http://47.107.87.154:8080/wechat_mall/product/newList.shtml',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].price = res.data.data[i].price.toFixed(2);
            }
            that.setData({
              newgoods: res.data.data,
            })
          } else {
            that.setData({
              newgoods: "",
            })
          }
        },
      }),
      wx.request({ //页面初始化加载热门商品
        url: 'http://47.107.87.154:8080/wechat_mall/product/hotList.shtml',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].price = res.data.data[i].price.toFixed(2);
            }
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
    wx.request({ //页面初始化加载轮播图
        url: 'http://47.107.87.154:8080/wechat_mall/advert/getAdvertByType.shtml?type=1',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            that.setData({
              imgUrls: res.data.data,
            })
          } else {
            that.setData({
              imgUrls: "",
            })
          }
        },
      }),
      wx.request({ //页面初始化加载外接广告
        url: 'http://47.107.87.154:8080/wechat_mall/advert/getAdvertByType.shtml?type=2',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
            that.setData({
              moregoods: res.data.data,
            })
          } else {
            that.setData({
              moregoods: "",
            })
          }
        },
      })
  }
})