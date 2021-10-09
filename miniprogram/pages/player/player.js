// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPlayersNum: 0,
    allPlayersInfo:{},
    color: [' linen','lightyellow'],
    str: 'http://37446r369t.zicp.vip/media/'
  },

  // 自定义函数
  goPage(e){
    const temp =e.currentTarget.dataset.info
    const info = JSON.stringify(temp)
    console.log(info)
    wx.navigateTo({
        url: '/pages/editPlayer/editPlayer?info=' + info
    })
  },

  addPlayer(){
    wx.navigateTo({
      url: '/pages/addPlayer/addPlayer'
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
        // console.log(res);
        const temp = res.data.data
        console.log(temp.length)
        that.setData({
          allPlayersNum: temp.length,
          allPlayersInfo: temp
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
    var that = this
    wx.request({
      url:'http://37446r369t.zicp.vip/usr/allPlayer',
      header: { 'Content-Type': ' application/json' },
      success:function(res){
        // console.log(res);
        const temp = res.data.data
        console.log(temp.length)
        that.setData({
          allPlayersNum: temp.length,
          allPlayersInfo: temp
        })
      }
    })
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