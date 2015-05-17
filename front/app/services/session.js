import Ember from 'ember';

export default Ember.Service.extend({
  email: null,
  token: null,
  // 当前 session service 的 error
  error: null,
  // 登陆
  signin(email, password) {
    return Ember.$.ajax('/session', {
      type: 'POST',
      data: {
        email: email,
        password: password
      },
      dataType: 'json'
    }).done((r) => {
      // 在这里将原始 Cookie 存储
      this.set('token', Cookies.get('token'));
      this.set('email', email);
      localStorage.setItem('token', Cookies.get('token'));
      localStorage.setItem('email', email);
      console.log("response: " + JSON.stringify(r) + ";;;;" + this.get('email'));
    }).fail((xhr) => {
      console.log('error in session service: ' + xhr.responseText);
    });
  },

  // 登出
  signout() {
    // clear all information
    localStorage.removeItem('token');
    this.set('token', null);
    this.set('error', null);
    this.set('email', null);
  },

  // 检查本地是否有已经登陆过
  loadFromClient() {
    if(Cookies.get('token') != null) {
      this.set('token', Cookies.get('token'));
      this.set('email', localStorage.getItem('email'));
    }
    return this.get('token');
  },

  // 验证是否登陆
  isAuthenticate() {
    if(localStorage.getItem('token') == null) return false;
    return localStorage.getItem('token') === this.loadFromClient();
  }

  // TODO 验证有了, 还需要考虑授权.

});
