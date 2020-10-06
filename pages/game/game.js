// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgname: [0,1,2,3,4,5,6,7,8,9],
    // imgname: [0,2,6,9,5,1,3,4,7,8],
    imgname: [0,1,2,3,4,5,6,7,9,8],
    win:true,
    op:1,
    cnt: 0,
    scale:"",
    setInter:'',
    minute: '0' + 0,   // 分
    second: '0' + 0,    // 秒
    PX: [0,216,430],
    PY: [0,210,420],
    left1:'',
    top1:'',

    left2:'216',
    top2:'',

    left3:'430',
    top3:'',

    left4:'0',
    top4:'210',

    left5:'216',
    top5:'210',

    left6:'430',
    top6:'210',

    left7:'',
    top7:'420',

    left8:'216',
    top8:'420',

    left9:'430',
    top9:'420',
  },

// 计时器
setInterval: function () {
    const that = this
    var second = that.data.second
    var minute = that.data.minute
    this.data.setInter = setInterval(function () {  // 设置定时器
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
GoToTarget: function(){
    wx.navigateTo({
      url: '../targerImg/targerImg',
    })
  },
moveing: function(e){

    let selectid = Number(e.target.id);
    console.log("id="+selectid);
    
    // 图块移动 当win=true时，图块锁定
    if(!this.data.win){
      if((this.data.imgname[selectid+1] == 9) && (selectid < 9)){
        this.data.imgname[selectid+1] = this.data.imgname[selectid];
        this.data.imgname[selectid] = 9;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt+1
        })
      }
      else if((this.data.imgname[selectid-1] == 9) && (selectid > 1)){
        this.data.imgname[selectid-1] = this.data.imgname[selectid];
        this.data.imgname[selectid] = 9;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt+1
        })
      }
      else if((this.data.imgname[selectid+3] == 9) && (selectid < 7)){
        this.data.imgname[selectid+3] = this.data.imgname[selectid];
        this.data.imgname[selectid] = 9;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt+1
        })
      }
      else if((this.data.imgname[selectid-3] == 9) && (selectid > 3)){
        this.data.imgname[selectid-3] = this.data.imgname[selectid];
        this.data.imgname[selectid] = 9;
        this.setData({
          imgname: this.data.imgname,
          cnt: this.data.cnt+1
        })
      }
    }
    let cnt = 0;
    for(let i = 1;i < 10;i++){
      if(this.data.imgname[i] == i){
        cnt++;
      }
    }
    console.log(cnt);
    if(cnt == 9){
      console.log("You Win!!!!");
      this.setData({
        win: true
      }),
      clearInterval(this.data.setInter);
      this.data.op = 0.3;
    }
    console.log(this.data.imgname);
  
    
  },

  flush: function(){
    wx.navigateTo({
      url: '../game/game',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          scale: 750/res.windowWidth
        })
        // console.log(that.data.scale);
        
      }
    }
    )
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