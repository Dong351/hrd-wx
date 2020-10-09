//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    code: "",
    login: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  GoToTargetPage: function (e) {
    wx.navigateTo({
      url: '/pages/tarImg/tarImg',
    })
  },
  GoToRule: function (e) {
    wx.navigateTo({
      url: '../rule/rule',
    })
  },

  login: function () {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://101.133.236.170/api/login',
            data: {
              code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function(d){
              console.log(d);
              app.globalData.token = d.data.data.code;
              console.log(app.globalData.token);
            },
            fail: function(d){
              console.log("fali login");
              
            }
          })
          console.log(res);

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    console.log(this.data.code);
  },












  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.login();
  }
})