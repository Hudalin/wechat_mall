// pages/updatePwd/updatePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPwd:'',
    newPwd:'',
    reNewPwd:'',
    account:'',
    errorMsg:'',
  },

  delOldPwd : function (e){
    var that = this;
    that.setData({
      oldPwd:''
    })
  },

  delNewPwd: function (e) {
    var that = this;
    that.setData({
      newPwd: ''
    })
  }, 
  
  delReNewPwd: function (e) {
    var that = this;
    that.setData({
      reNewPwd: ''
    })
  },

  oldPwdInput: function (e) {
    var that = this;
    that.setData({
      oldPwd: e.detail.value
    })
  },

  newPwdInput: function (e) {
    var that = this;
    that.setData({
      newPwd: e.detail.value
    })
  },

  reNewPwdInput: function (e) {
    var that = this;
    that.setData({
      reNewPwd: e.detail.value
    })
  },



 



  formSubmit: function (e) {
    var that = this;
    if (that.data.oldPwd == '' || that.data.newPwd == '' || that.data.reNewPwd == '') {
      that.setData({
        errorMsg: '请输入密码'
      });
      return;
    } else {
      that.setData({
        errorMsg: ''
      })
    }
    if (that.data.newPwd != that.data.reNewPwd){
      that.setData({
        errorMsg: '两次密码输入不一样'
      });
      return;
    }else{
      that.setData({
        errorMsg: ''
      })
    }
    if (that.data.oldPwd == that.data.newPwd) {
      that.setData({
        errorMsg: '新密码不能与旧密码相同'
      });
      return;
    } else {
      that.setData({
        errorMsg: ''
      })
    }
    wx.request({
      url: 'http://47.107.87.154:8080/wechat_mall/user/update/Pwd.shtml',
      data: {
        account: that.data.account,
        oldPwd:that.data.oldPwd,
        newPwd:that.data.newPwd
      },
      method: "PUT",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code === 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          var pages = getCurrentPages();
          var Page = pages[pages.length - 1];//当前页
          if (pages.length > 1) { //说明有上一页存在
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里，调用上一页的函数
            prePage.changeData()
          }
          setTimeout(function () {
            //要延时执行的代码
            wx.navigateBack({
              delta: 1
            })
          }, 1500) //延迟时间
        } else {
          console.log(that.data.errorMsg);
          console.log(res.data.msg);
          that.setData({
            errorMsg:res.data.msg
          })
        }
      },
    })
  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var account='15970544525';
    options.account = account;
    that.setData({
      account: options.account
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

var Mine = require('../mine/mine.js');