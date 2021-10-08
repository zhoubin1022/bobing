// pages/editPlayer/editPlayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    tempName: '',
    tempFilePaths: '',
    info:{},
    str: 'http://37446r369t.zicp.vip/media/',
    flag: 0
  },
  
  handleInput(e){
    console.log(e.detail)
    this.setData({
      tempName: e.detail.value
    })
  },

  okTap(){
    var that = this
    console.log(that.data.tempFilePaths)
    console.log(this.data.flag)
    if(this.data.flag==0){
      wx.request({
        url: 'http://37446r369t.zicp.vip/usr/editPlayer',
        method: "POST",
        header: { 'Content-Type': ' application/x-www-form-urlencoded' },
        data:{
          "new_photo": that.data.flag,
          "name": that.data.tempName,
          "id": that.data.id
        },
        success: function (res) {
          console.log(res.data + "成功")
        }
      })
    }
    else if(this.data.flag==1){
      wx.uploadFile({
        url:"http://37446r369t.zicp.vip/usr/editPlayer",
        filePath: that.data.tempFilePaths,
        name: "photo",
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          "new_photo": that.data.flag,
          "photo": that.data.tempFilePaths,
          "id": that.data.id,
          "name": that.data.tempName
        },
        success: function (res) {
          console.log(res.data + "成功")
        },
        fail: function (res) {
          console.log(res.errMsg + "失败")
        }    
      })
    }
    wx.navigateBack({
      delta: 1,
      success: function (e) {
      var page = getCurrentPages().pop();
        if(page == undefined || page == null) return;
          page.onLoad();
        }
    })
  },
  delTap(){
    var that = this
    wx.request({
      url: 'http://37446r369t.zicp.vip/usr/deletePlayer',
      method: "POST",
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data:{
        "id": that.data.id
      },
      success(res){
        console.log(res)
      }
    })
    wx.navigateBack({
      delta: 1,
      success: function (e) {
      var page = getCurrentPages().pop();
        if(page == undefined || page == null) return;
          page.onLoad();
        }
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
          flag: 1
        })
      }
    })
  },

  onLoad: function (options) {
    var temp = JSON.parse(options.info)
    console.log(temp)
    this.setData({
      info: temp,
      id: temp.pk,
      tempName: temp.fields.name,
      tempFilePaths: 'http://37446r369t.zicp.vip/media/' + temp.fields.photo
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