// pages/myrecord/myrecord.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:"",
    emptylist: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: 'https://soft.leavessoft.cn/api/record', //本地服务器地址
      method: 'GET',
      header: {
        'content-type': 'application/json', //默认值
        'Authorization': token
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          listData: res.data.data,
          emptylist: false
        })
        console.log(that.data.listData);
        
      },
      fail: function (res) {
        console.log("获取个人记录失败");
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