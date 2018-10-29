// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    error: "",
    mine_list: [{
        "pic_url": "/images/icons/iocn_home_01.png",
        "title": "我的订单",
      },
      {
        "pic_url": "/images/icons/iocn_home_02.png",
        "title": "优惠卡券",
      },
      {
        "pic_url": "/images/icons/iocn_home_03.png",
        "title": "收货地址",
      },
      {
        "pic_url": "/images/icons/iocn_home_04.png",
        "title": "客服电话",
      },
      {
        "pic_url": "/images/icons/iocn_home_04.png",
        "title": "活动总览",
      },
      {
        "pic_url": "/images/icons/iocn_home_04.png",
        "title": "修改密码",
      }
    ],
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数

  },

  /**
   * 微信登录
   */
  getUserInfo: function(e) {
    var that = this;
    var user = e.detail.userInfo;
    wx.login({
      success(result) {
        if (result.code) {
          //发起网络请求
          wx.request({
            url: 'http://47.107.87.154:8080/wechat_mall/user/wechatLogin.shtml?' + Util.json2String({
              code: result.code,
              nickName: user.nickName,
              avatarUrl: user.avatarUrl,
              gender: user.gender,
            }),
            method: "POST",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              if (res.data.code === 0) {
                that.setData({
                    userInfo: res.data.userInfo,
                    error: "",
                    hasUserInfo: true
                  }),
                  //将用户数据account进行缓存
                wx.setStorageSync('userInfo', res.data.userInfo)
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                })
                //更换标题
                wx.setNavigationBarTitle({
                  title: '用户中心'
                })
              }
              if (res.data.code === 408) {
                that.setData({
                  error: "用户名或密码错误",
                  hasUserInfo: false
                })
              }
            },
          })
        } else {
          that.setData({
            error: "用户名或密码错误",
            hasUserInfo: false
          })
        }
      }
    });
  },

  /**
   * 用户安全退出登录
   */
  quit: function() {
    this.setData({
        userInfo: '',
        hasUserInfo: false,
        error: ""
      }),
      wx.showToast({
        title: '已安全退出',
        icon: 'success',
      })
  },

  /**
   * 手机用户登录
   */
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    /*this.setData({
      error: "用户名或密码错误"
    })*/
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/user/login.shtml',
      method: "POST",
      data: formData,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code === 0) {
          that.setData({
              userInfo: res.data.userInfo,
              error: "",
              hasUserInfo: true
            }),
            //将用户数据进行缓存
          wx.setStorageSync('userInfo', res.data.userInfo)
          wx.showToast({
            title: '登录成功',
            icon: 'success',
          })
          //更换标题
          wx.setNavigationBarTitle({
            title: '用户中心'
          })
        }
        if (res.data.code === 408) {
          that.setData({
            error: "用户名或密码错误",
            hasUserInfo: false
          })
        }
      },
    })
  },

  /**
   * 个人信息 菜单按钮，
   */
  lookdetail: function(e) {
    var that = this;
    var title = e.currentTarget.dataset.title;
    if (title == "我的订单") {
      wx.navigateTo({
        url: "/pages/order/order"
      })
    }
    if (title == "优惠券") {
      console.l
    }
    if (title == "收货地址") {
      wx.navigateTo({
        url: "/pages/myAddress/myAddress"
      })
    }
    if (title == "客服电话") {
      wx.showModal({
        title: '提示',
        content: '确认拨打客服电话吗？',
        success: function (res) {
          wx.makePhoneCall({
            phoneNumber: '15970544525' //仅为示例，并非真实的电话号码
          })
        }
      })
      /*wx.showToast({
        title: '客服电话为:\r\n15970544525',
        icon: 'none',
        mask: false,
        duration: 5000
      })*/
    }
    if (title == "提货券") {
      console.log(5)
    }
    if (title == "修改密码") {
      if (that.data.userInfo.account.length != 11) {
        wx.showToast({
          title: '微信用户不支持',
          icon: 'loading',
          image: '../../images/icons/error.png',
          duration: 2000
        })
      } else { //跳转至修改密码界面
        wx.navigateTo({
          url: "/pages/updatePwd/updatePwd?account=" + that.data.userInfo.account
        })
      }
    }
  },

  /**
   * 下一级页面修改上一级页面data资料(用于设置密码后让用户进行登录)
   */
  changeData: function() {
    this.setData({
      userInfo: {},
      hasUserInfo: false,
      error: "",
    })
  },
  
  /**
   * 下拉页面  加载
   */
  /*onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      wx.hideNavigationBarLoading()
    }, 3000)
  }*/
})

var Util = require('../../utils/util.js');