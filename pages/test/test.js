Page({
  data: {
      minute: '0' + 0,   // 分
      second: '0' + 0    // 秒
  },

  test: function(){
    wx.request({
        url: 'http://101.133.236.170/api/genTest', //本地服务器地址
        // data: {
        //   username: '001',
        //   password: 'abc',
        // },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log("失败");
        }
      })
  },
  onLoad: function (options) {
      // 调用函数
      this.setInterval()
  }, 
  
  // 计时器
  setInterval: function () {
      const that = this
      var second = that.data.second
      var minute = that.data.minute
      setInterval(function () {  // 设置定时器
          second++
          if (second >= 60) {
              second = 0  //  大于等于60秒归零
              minute++
              if (minute < 10) {
                  // 少于10补零
                  that.setData({
                      minute: '0' + minute
                  })
              } else {
                  that.setData({
                      minute: minute
                  })
              }
          }
          if (second < 10) {
              // 少于10补零
              that.setData({
                  second: '0' + second
              })
          } else {
              that.setData({
                  second: second
              })
          }
      }, 1000)
  },
})