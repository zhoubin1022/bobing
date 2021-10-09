// pages/startGame/startGame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diceNum: [1,2,3,4,5,6],
    prize: ['状元插金花','六杯红','遍地锦','六杯黑','五红','五子登科','四点红','对堂','三红','四进','二举','一秀','无'],
    level: 12,
    players:[],
    playerNum: 0,
    currentGameNum: 1,
    currentPlayer: 0,
    gameNum: 0,
    gameid: 0,
    str: 'http://37446r369t.zicp.vip/media/',
    showFlag: false,
    hiddenGIF: true,
    hiddenDice: false,
    hiddenButton: false
  },

  handleTap(){
    var that = this
    console.log(that.data.gameid)
    console.log(that.data.gameNum)
    console.log(that.data.playerNum)
    console.log(that.data.currentGameNum)
    console.log(that.data.players[that.data.currentPlayer].pk)
    wx.request({
      url: 'http://37446r369t.zicp.vip/game/judge',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      data:{
        "pid": that.data.gameid,
        "lun": that.data.gameNum,
        "num": that.data.playerNum,
        "now_lun": that.data.currentGameNum,
        "uid": that.data.players[that.data.currentPlayer].pk
      },
      success(res){
        console.log(res)
        const temp = res.data.data[0]
        that.setData({
          'diceNum[0]': temp.num_1,
          'diceNum[1]': temp.num_2,
          'diceNum[2]': temp.num_3,
          'diceNum[3]': temp.num_4,
          'diceNum[4]': temp.num_5,
          'diceNum[5]': temp.num_6,
          level: temp.level
        })
      }
    })
    this.setData({
      hiddenGIF: false,
      hiddenDice: true,
      hiddenButton: true
    })
    setTimeout(this.stopGIF,3000)
    setTimeout(this.infoOver,7000)
    setTimeout(this.judge,7000)
  },
  stopGIF(){
    this.setData({
      hiddenGIF: true,
      hiddenDice: false,
      showFlag: true
    })
  },
  infoOver(){
    this.setData({
      showFlag: false,
      hiddenButton: false
    })
  },
  judge(){
    this.setData({
      currentPlayer: this.data.currentPlayer + 1
    })
    if( this.data.currentPlayer==this.data.playerNum ){
      if(this.data.currentGameNum==this.data.gameNum){
        wx.redirectTo({
          url: '/pages/showResult/showResult?gameid=' + this.data.gameid
        })
      }
      else{
        this.setData({
          currentPlayer: 0,
          currentGameNum: this.data.currentGameNum + 1
        })   
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temp = JSON.parse(options.info)
    console.log(temp)
    console.log(options.gameid)
    this.setData({
      players: temp,
      playerNum: options.playerNum,
      gameNum: options.gameNum,
      gameid: options.gameid
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