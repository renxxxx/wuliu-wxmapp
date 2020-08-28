// pages/recognizeSh/recognizeSh.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    image1: '',
    image2: '',
    realname: '',
    company: '',
    fuWuShangIntro: '',
  },
  yyzz() {
    wx.navigateTo({
      url: '../recPhoto/recPhoto?typeId=1',
    })
  },
  idcard() {
    wx.navigateTo({
      url: '../recPhoto/recPhoto?typeId=2',
    })
  },
  realname(e) {
    this.setData({
      realname: e.detail.value
    })
  },
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  tel(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  fuWuShangIntro(e) {
    this.setData({
      fuWuShangIntro: e.detail.value
    })
  },
  company(e) {
    this.setData({
      company: e.detail.value
    })
  },
  // 提交
  makesure(e) {
    let that = this
    if (that.data.type == 0) {
      if (app.globalData.renzhengcover1 == "" || app.globalData.renzhengcover2 == "" || that.data.realname == "" || that.data.fuWuShangIntro == "" || that.data.company == "") {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none'
        })
        return
      }
      wx.showToast({
        title: '请稍等',
        icon: 'none',
        duration: 2000
      })
      wx.request({
        url: app.globalData.url + '/wuliu/ren-zheng-fu-wu-shang-ti-jiao',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookie')
        },
        data: {
          idCard: app.globalData.renzhengcover1,
          yingYeZhiZhao: app.globalData.renzhengcover2,
          realname: that.data.realname,
          fuWuShangIntro: that.data.fuWuShangIntro,
          company: that.data.company
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            wx.request({
              url: app.globalData.url + '/wuliu/login-refresh',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': wx.getStorageSync('cookie')
              },
              method: 'post',
              success: function (res) {
                wx.hideToast()
                if (res.data.code == 0) {
                  app.globalData.userInfoDetail = res.data.data
                  app.globalData.loginIf = 1
                  that.setData({
                    loginIf: app.globalData.loginIf
                  })
                  wx.showToast({
                    title: '认证提交审核',
                    icon: 'none',
                    duration: 100,
                    mask: true,
                    complete: function complete(res) {
                      setTimeout(function () {
                        wx.navigateBack({
                          complete: (res) => { },
                        })
                      }, 100);
                    }
                  })
                } else if (res.data.code == 20) {
                  app.globalData.loginIf = 0
                } else {
                  wx.showToast({
                    title: res.data.codeMsg,
                    icon: 'none'
                  })
                }
              }
            })

          } else if (res.data.code == 20) {
            app.globalData.loginIf = 0
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon: 'none'
            })
          }
        }
      })
    }else{
      if (app.globalData.renzhengcover1 == "" || app.globalData.renzhengcover2 == "" || that.data.realname == ""  || that.data.company == "") {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none'
        })
        return
      }
      wx.showToast({
        title: '请稍等',
        icon: 'none',
        duration: 2000
      })
      wx.request({
        url: app.globalData.url + '/wuliu/ren-zheng-ti-jiao',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookie')
        },
        data: {
          idCard: app.globalData.renzhengcover1,
          yingYeZhiZhao: app.globalData.renzhengcover2,
          realname: that.data.realname,
          renZhengType: that.data.type,
          company: that.data.company
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            wx.request({
              url: app.globalData.url + '/wuliu/login-refresh',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': wx.getStorageSync('cookie')
              },
              method: 'post',
              success: function (res) {
                wx.hideToast()
                if (res.data.code == 0) {
                  app.globalData.userInfoDetail = res.data.data
                  app.globalData.loginIf = 1
                  that.setData({
                    loginIf: app.globalData.loginIf
                  })
                  wx.showToast({
                    title: '认证提交审核',
                    icon: 'none',
                    duration: 100,
                    mask: true,
                    complete: function complete(res) {
                      setTimeout(function () {
                        wx.navigateBack({
                          delta:2,
                          complete: (res) => { },
                        })
                      }, 100);
                    }
                  })
                } else if (res.data.code == 20) {
                  app.globalData.loginIf = 0
                } else {
                  wx.showToast({
                    title: res.data.codeMsg,
                    icon: 'none'
                  })
                }
              }
            })

          } else if (res.data.code == 20) {
            app.globalData.loginIf = 0
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon: 'none'
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    if (app.globalData.userInfoDetail.idCard) {
      app.globalData.renzhengcover1 = app.globalData.userInfoDetail.idCard
    }
    if (app.globalData.userInfoDetail.yingYeZhiZhao) {
      app.globalData.renzhengcover2 = app.globalData.userInfoDetail.yingYeZhiZhao
    }
    this.setData({
      realname: app.globalData.userInfoDetail.realname || '',
      company: app.globalData.userInfoDetail.company || '',
      fuWuShangIntro: app.globalData.userInfoDetail.fuWuShangIntro || '',
    })

    if (options.type == 0) {
      this.setData({
        show1: true,
        show2: false,
        show3: false,
        show4: true,
        type: options.type
      })
    } else {
      this.setData({
        show1: true,
        show2: false,
        show3: false,
        show4: false,
        type: options.type
      })
    }
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
    this.setData({
      image1: app.globalData.renzhengcover1 || '',
      image2: app.globalData.renzhengcover2 || ''
    })
    console.log(this.data.image1)
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