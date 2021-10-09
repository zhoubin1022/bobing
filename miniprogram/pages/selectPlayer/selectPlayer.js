// pages/selectPlayer/selectPlayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPlayersNum: 0,
    allPlayersInfo:[],
    optionalPlayers:[],
    selectedPlayers:[],
    playerNum:2,
    gameNum:1
  },

  playerNumHandleTap(e){
    console.log(e);
    const operation = e.currentTarget.dataset.operation;
    if( this.data.playerNum+operation >= 2 && this.data.playerNum+operation<=6){
      this.setData({
        playerNum: this.data.playerNum+operation
      })
    }
  },
  gameNumHandleTap(e){
    console.log(e);
    const operation = e.currentTarget.dataset.operation;
      if( this.data.gameNum+operation >= 1){
        this.setData({
          gameNum: this.data.gameNum+operation
        })
      }
  },

  addPlayer(e){
    if(this.data.selectedPlayers.length>=this.data.playerNum)
      return;
    const player = e.currentTarget.dataset.player;
    const tempOptionalPlayers = this.data.optionalPlayers
    const tempSelectedPlayers = this.data.selectedPlayers
    console.log(player)
    var i;
    for(i=0;i<tempOptionalPlayers.length;i+=1){
      if(JSON.stringify(tempOptionalPlayers[i])==JSON.stringify(player)){
        break;
      }
    }
    console.log(i)
    tempOptionalPlayers.splice(i,1)
    tempSelectedPlayers.push(player)
    this.setData({
      selectedPlayers: tempSelectedPlayers,
      optionalPlayers: tempOptionalPlayers
    })
    console.log(this.data.selectedPlayers)
    console.log(this.data.optionalPlayers)
  },

  subPlayer(e){
    const player = e.currentTarget.dataset.player;
    const tempOptionalPlayers = this.data.optionalPlayers
    const tempSelectedPlayers = this.data.selectedPlayers
    console.log(player)
    var i;
    for(i=0;i<tempSelectedPlayers.length;i+=1){
      if(JSON.stringify(tempSelectedPlayers[i])==JSON.stringify(player)){
        break;
      }
    }
    console.log(i)
    tempSelectedPlayers.splice(i,1)
    tempOptionalPlayers.push(player)
    this.setData({
      selectedPlayers: tempSelectedPlayers,
      optionalPlayers: tempOptionalPlayers
    })
    console.log(this.data.selectedPlayers)
    console.log(this.data.optionalPlayers)
  },
  
  goPage(e){
    var that = this
    const temp = this.data.selectedPlayers
    const info = JSON.stringify(temp)
    console.log(info)
    wx.navigateTo({
        url: '/pages/startGame/startGame?info=' + info + '&playerNum=' + that.data.playerNum + '&gameNum=' + that.data.gameNum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url:'http://37446r369t.zicp.vip/usr/allPlayer',
      header: { 'Content-Type': ' application/json' },
      success:function(res){
        console.log(res);
        const temp = res.data.data
        // console.log(temp.length)
        that.setData({
          allPlayersNum: temp.length,
          allPlayersInfo: temp,
          optionalPlayers: temp
        })
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



