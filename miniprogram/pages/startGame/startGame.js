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
    playerNum: '',
    currentGameNum: 1,
    currentPlayer: 0,
    gameNum: '',
    str: 'http://37446r369t.zicp.vip/media/'
  },



  handleTap(){
    var that = this
    wx.request({
      url: 'http://37446r369t.zicp.vip/game/judge',
      header: { 'Content-Type': ' application/json' },
      method: "GET",
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
      currentPlayer: this.data.currentPlayer + 1
    })
    if( this.data.currentPlayer==this.data.playerNum ){
      if(this.data.currentGameNum==this.data.gameNum){
        wx.navigateTo({
          url: '/pages/homePage/homePage'
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
    console.log(options.gameNum)
    this.setData({
      players: temp,
      playerNum: options.playerNum,
      gameNum: options.gameNum
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