// pages/addPlayer/addPlayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempName: 'Null',
    tempFilePaths:'/images/backgroundPictures/default.png'
  },
  handleInput(e){
    console.log(e.detail)
    this.setData({
      tempName: e.detail.value
    })
  },
  okTap(){
    var that = this
    wx.uploadFile({
      filePath: that.data.tempFilePaths,
      name: 'photo',
      url: 'http://37446r369t.zicp.vip/usr/addPlayer',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        "photo": that.data.tempFilePaths,
        "name": that.data.tempName
      },
      success: function (res) {
        console.log(res.data + "成功")
      },
    })
  },

  cancelTap(){
    wx.navigateBack({
      delta: 1
    })
  },

  chooseImage(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res) 
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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