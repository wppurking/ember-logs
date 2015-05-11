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
      console.log(r);
    }).fail(() => {
      console.log('error');
    });
  },

  // 登出
  signout() {
  },

  // 验证是否登陆
  isAuthenticate() {
    return localStorage.getItem('token') === this.get('token');
  }

  // TODO 验证有了, 还需要考虑授权.

});
