// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankInfo:[],
    prize: ['状元插金花','六杯红','遍地锦','六杯黑','五红','五子登科','四点红','对堂','三红','四进','二举','一秀','无'],
    color: ['white','lightyellow']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://37446r369t.zicp.vip/rank/allRank',
      header: { 'Content-Type': ' application/json' },
      method: 'GET',
      success(res){
        var temp = res.data.data
        console.log(temp)
        that.setData({
          rankInfo: temp
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