class SessionController < ApplicationController
  before_action :authenticate!, only: [:destroy]

  # sign in 用户登陆
  def create
    # 收集用户参数
    errors = {}
    errors[:email] = ['User name can not be blank!'] if params[:email].blank?
    errors[:password] = ['Password can not be blank!'] if params[:password].blank?

    if errors.size > 0
      render json: {errors: errors}
    else
      # 验证用户参数
      # 做出判断
      if USER[params[:email].strip.to_sym] == params[:password]
        cookies.encrypted[:token] = generate_token
        render json: {users: {email: 'wyatt'}}
      else
        errors[:email] = ['User or password is invalid.']
        render json: {errors: errors}
      end
    end
  end

  # log out 用户登出
  def destroy
    cookies.delete(:token)
    flash[:success] = "Success log out"
    render json: {status: flash}
  end

end
