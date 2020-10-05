// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgname: [0,1,2,3,4,5,6,7,8,9],
    imgname: [0,2,6,8,5,1,3,4,7,9],
    win:false,
    scale:"",
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

  GoToTarget: function(){
    wx.navigateTo({
      url: '../targerImg/targerImg',
    })
  },
  moveing: function(e){

    let selectid = Number(e.target.id);
    // let x;
    // let y;
    // if(selectid == 0){
    //   x = 430;
    //   y = 420;
    // }
    // else{
    //   console.log("px="+(selectid%3-1));
    //   console.log("py="+parseInt((selectid-1)/3));
      
    //   if((selectid%3-1) == -1){
    //     x = 430;
    //   }
    //   else x = this.data.PX[selectid%3-1];
    //   y = this.data.PY[parseInt((selectid-1)/3)];
    // }
    console.log("id="+selectid);
    // console.log("x="+x);
    // console.log("y="+y);
    
    if((this.data.imgname[selectid+1] == 9) && (selectid < 9)){
      this.data.imgname[selectid+1] = this.data.imgname[selectid];
      this.data.imgname[selectid] = 9;
      this.setData({
        imgname: this.data.imgname
      })
    }
    else if((this.data.imgname[selectid-1] == 9) && (selectid > 1)){
      this.data.imgname[selectid-1] = this.data.imgname[selectid];
      this.data.imgname[selectid] = 9;
      this.setData({
        imgname: this.data.imgname
      })
    }
    else if((this.data.imgname[selectid+3] == 9) && (selectid < 7)){
      this.data.imgname[selectid+3] = this.data.imgname[selectid];
      this.data.imgname[selectid] = 9;
      this.setData({
        imgname: this.data.imgname
      })
    }
    else if((this.data.imgname[selectid-3] == 9) && (selectid > 3)){
      this.data.imgname[selectid-3] = this.data.imgname[selectid];
      this.data.imgname[selectid] = 9;
      this.setData({
        imgname: this.data.imgname
      })
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
      })
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