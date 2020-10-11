// pages/game/game.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgname: [0,1,2,3,4,5,6,7,8,9],
    // imgname: [0,2,6,9,5,1,3,4,7,8],
    index: "", //图片序号
    imgname: "", //图块的序号数组
    back: "", //备份的图块的序号数组
    cheat_step: "", //自动复原的string串
    mod_show:"数字",
    show: false,
    win: false,
    op: 1,
    cnt: 0,
    scale: "",
    setInter: '',
    minute: '0' + 0, // 分
    second: '0' + 0, // 秒
    PX: [0, 216, 430],
    PY: [0, 210, 420],
    left1: '',
    top1: '',

    left2: '216',
    top2: '',

    left3: '430',
    top3: '',

    left4: '0',
    top4: '210',

    left5: '216',
    top5: '210',

    left6: '430',
    top6: '210',

    left7: '',
    top7: '420',

    left8: '216',
    top8: '420',

    left9: '430',
    top9: '420',
  },

  // 计时器
  setInterval: function () {
    const that = this
    var second = that.data.second
    var minute = that.data.minute
    this.data.setInter = setInterval(function () { // 设置定时器
      second++
      if (second >= 60) {
        second = 0 //  大于等于60秒归零
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
  GoToTarget: function () {
    wx.navigateTo({
      url: '../targerImg/targerImg',
    })
  },

  again: function () {
    wx.navigateTo({
      url: '../tarImg/tarImg',
    })
  },

  backToIndex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  moveing: function (e) {
    let selectid = Number(e.target.id);
    console.log("id=" + selectid);

    // 图块移动 当win=true时，图块锁定
    if (!this.data.win) {
      if ((this.data.imgname[selectid] == 0) && (selectid < 9)) {
        this.data.imgname[selectid] = this.data.imgname[selectid - 1];
        this.data.imgname[selectid - 1] = 0;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt + 1
        })
      } else if ((this.data.imgname[selectid - 2] == 0) && (selectid > 1)) {
        this.data.imgname[selectid - 2] = this.data.imgname[selectid - 1];
        this.data.imgname[selectid - 1] = 0;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt + 1
        })
      } else if ((this.data.imgname[selectid + 2] == 0) && (selectid < 7)) {
        this.data.imgname[selectid + 2] = this.data.imgname[selectid - 1];
        this.data.imgname[selectid - 1] = 0;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt + 1
        })
      } else if ((this.data.imgname[selectid - 4] == 0) && (selectid > 3)) {
        this.data.imgname[selectid - 4] = this.data.imgname[selectid - 1];
        this.data.imgname[selectid - 1] = 0;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt + 1
        })
      }
    }
    let cnt = 0;
    for (let i = 0; i < 9; i++) {
      if (this.data.imgname[i] == i+1) {
        cnt++;
      }
    }
    console.log(cnt);
    if (cnt == 8) {
      console.log("You Win!!!!");
      this.setData({
          win: true,
          op: 0.3
        }),
        clearInterval(this.data.setInter);
      
      //提交游戏结果
      let that = this;
    wx.request({
      url: 'https://soft.leavessoft.cn/api/record', 
      data: {
        Size: that.data.cnt,
        Time: that.data.second+that.data.minute*60
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', //默认值
        'Authorization': app.globalData.token
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log("提交成绩失败");
      }
    })
    }
    console.log(this.data.imgname);
  },

  flush: function () {
    console.log(this.data.back);

    this.setData({
      imgname: this.data.back
    })
  },
  change: function () {
    wx.navigateTo({
      url: '/pages/tarImg/tarImg',
    })
  },

  sleep: function (numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  },
  cheat: function () {
    let that = this;
    wx.request({
      url: 'https://soft.leavessoft.cn/api/answer', //本地服务器地址
      data: {
        mate: that.data.imgname
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        that.setData({
          cheat_step: res.data.data.path
        })
        let step = that.data.cheat_step;
        let str = step[0];
        console.log(str);
        for (let i = 0; i < str.length; i++) {
          // setTimeout(function () {
          let tmp = str.charAt(i);
          console.log(tmp);
          let imgmat = that.data.imgname;
          let index;
          for (let i = 0; i < imgmat.length; i++) {
            if (imgmat[i] == 0) {
              index = i;
              console.log(index);
            }
          }
          //移动图块
          if (tmp == "a") {
            that.data.imgname[index] = that.data.imgname[index - 1];
            that.data.imgname[index - 1] = 0;
            that.setData({
              imgname: that.data.imgname,
              cnt: that.data.cnt + 1
            })
          } else if (tmp == "d") {
            that.data.imgname[index] = that.data.imgname[index + 1];
            that.data.imgname[index + 1] = 0;
            that.setData({
              imgname: that.data.imgname,
              cnt: that.data.cnt + 1
            })
          } else if (tmp == "w") {
            that.data.imgname[index] = that.data.imgname[index - 3];
            that.data.imgname[index - 3] = 0;
            that.setData({
              imgname: that.data.imgname,
              cnt: that.data.cnt + 1
            })
          } else if (tmp == "s") {
            that.data.imgname[index] = that.data.imgname[index + 3];
            that.data.imgname[index + 3] = 0;
            that.setData({
              imgname: that.data.imgname,
              cnt: that.data.cnt + 1
            })
          }
          that.sleep(500);
          //       }, 10000)
        }
        that.setData({
            win: true,
            op: 0.3
          }),
        clearInterval(that.data.setInter);
      },
      fail: function (res) {
        console.log("自动复原失败获取失败");
      }
    })

  },

  changenum: function(){
    if(this.data.mod_show == "数字"){
      this.setData({
        index: 'num',
        mod_show: "图块"
      })
    }
    else{
      this.setData({
        mod_show: "数字"
      })
    }
  },
  
  record: function(){
    wx.navigateTo({
      url: '../record/record',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取全局变量，确定图片index
    this.setData({
      index: app.globalData.img_index
    })

    // 获取图片序列
    wx.request({
      url: 'https://soft.leavessoft.cn/api/genTest', //本地服务器地址
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        let mate = res.data.data.mate;
        console.log(mate);
        that.setData({
          imgname: mate
        })
        let mate2 = JSON.parse(JSON.stringify(mate));
        that.data.back = mate2;
        that.setData({
          show: true
        })
      },
      fail: function (res) {
        console.log(res);
        console.log("图片序列获取失败");
      }
    })

    // 获取页面初始分辨率
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          scale: 750 / res.windowWidth
        })
        // console.log(that.data.scale);

      }
    })

    //开启计时器
    this.setInterval();


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