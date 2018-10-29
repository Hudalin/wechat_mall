var flag = false;
var area = require('../../utils/area.js');
var util = require('../../utils/util.js');
var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var citys = []; //城市
var countys = []; //区县
var index = [0, 0, 0];
var t = 0;
var show = false;
var moveY = 200;

Page({
  data: {
    address: '',
    show: show,
    provinces: provinces,
    citys: citys,
    countys: countys,
    value: [0, 0, 0],
    type:'',
    chooseAddres:true
  },

  //滑动事件
  bindChange: function(e) {
    var that = this;
    var val = e.detail.value
    //判断滑动的是第几个column
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      getCityArr(val[0], this); //获取地级市数据
      getCountyInfo(val[0], val[1], this); //获取区县数据
    } else { //若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        getCountyInfo(val[0], val[1], this); //获取区县数据
      }
    }
    index = val;
    //console.log(index + " => " + val);
    //更新数据
    var province = 'address.address_province';
    var city = 'address.address_city';
    var district = 'address.address_district';
    that.setData({
      value: [val[0], val[1], val[2]],
      [province]: provinces[val[0]].name,
      [city]: citys[val[1]].name,
      [district]: countys[val[2]].name,
      chooseAddres:false
    })
  },

  onLoad: function(options) {
    var that = this;
    //获取省市区县数据
    area.getAreaInfo(function(arr) {
      areaInfo = arr;
      //获取省份数据
      getProvinceData(that);
    });
    //新增地址
    if ("add" == options.type){
      //更换标题
      wx.setNavigationBarTitle({
        title: '新增地址'
      })
      that.setData({
        type: "add"
      })
    }else{
      //修改地址
      //远程服务器获取修改对象
      var address_id = options.id;
      wx.request({
        url: 'http://47.107.87.154:8080/wechat_mall/address/getAddressById.shtml',
        data: {
          address_id: address_id
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          if (res.data.code == 0) {
            that.setData({
              address: res.data.address,
              type:"modify"
            })
            //更换标题
            wx.setNavigationBarTitle({
              title: '修改地址'
            })
          } else {
            console.log(res.data.msg)
          }
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
    this.animation.translateY(200 + 'vh').step();
    this.setData({
      animation: this.animation.export(),
      show: show
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  //移动按钮点击事件
  translate: function(e) {
    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
      console.log("t=1")
    } else {
      moveY = 200;
      show = true;
      t = 0;
      console.log("t=0")
    }
    animationEvents(this, moveY, show);
  },

  //隐藏弹窗浮层
  hiddenFloatView(e) {
    //console.log(e);
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);
  },

  //点击删除
  delete: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该地址信息吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://47.107.87.154:8080/wechat_mall/address/deleteAddress.shtml?address_id=' + that.data.address.address_id,
            method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: { // 设置请求的 header
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code == 0) {
                //刷新上一个页面并跳转至上一个页面
                var pages = getCurrentPages();
                if (pages.length > 1) {
                  //上一个页面实例对象
                  var prePage = pages[pages.length - 2];
                  //关键在这里,这里面是触发上个界面
                  prePage.flush();
                }
                wx.navigateBack({
                  delta: 1
                });
              } else {
                console.log(res.data.msg)
              }
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //点击取消，返回上个页面
  cancel: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //点击保存
  formSubmit: function(e) {
    var that = this;
    var url = '';
    if(that.data.type == 'modify'){
      url = 'http://47.107.87.154:8080/wechat_mall/address/updateAddress.shtml?' + util.json2String(that.data.address);
    }else{
      var userInfo = wx.getStorageSync('userInfo');
      url = 'http://47.107.87.154:8080/wechat_mall/address/addAddress.shtml?' + util.json2String(that.data.address) + '&uid=' + userInfo.uid;
    }
    wx.request({
      url:url,
      method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 0) {
          //刷新上一个页面并跳转至上一个页面
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里,这里面是触发上个界面
            prePage.flush();
          }
          wx.navigateBack({
            delta: 1
          });
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },

  changeName: function(e) {
    var name = 'address.address_name';
    this.setData({
      [name]: e.detail.value
    })
  },

  changePhone: function(e) {
    var phone = 'address.address_phone';
    this.setData({
      [phone]: e.detail.value
    })
  },

  changeDetail: function(e) {
    var detail = 'address.address_detail';
    this.setData({
      [detail]: e.detail.value
    })
  },

})

//动画事件
function animationEvents(that, moveY, show) {
  //console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()

  that.setData({
    animation: that.animation.export(),
    show: show
  })

}

// ---------------- 分割线 ----------------

//获取省份数据
function getProvinceData(that) {
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  that.setData({
    provinces: provinces
  })
  //初始化调一次可更改
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({
    province: "北京市",
    city: "市辖区",
    county: "东城区",
  })
}

// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = {
      name: ''
    };
  }
  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = {
      name: ''
    };
  }
  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}