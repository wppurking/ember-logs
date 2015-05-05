class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  USER = {
      wyatt: '132456',
      holly: '241356'
  }

  # 当前用户
  def current_user
    cookie_token.split(' ')[0]
  end

  def cookie_token
    token = cookies.encrypted[:token]
    if token
      token
    else
      ""
    end
  end

  def authenticate!
    user, pass = user_and_pass
    if cookies.encrypted[:token] == private_generate_token(user, pass)
      true
    else
      errors = {error: "You must be logged in to access this section"}
      render json: {errors: errors}, status: 422
      false
    end
  end

  def generate_token
    private_generate_token(params[:email], USER[params[:email].strip])
  end

  def private_generate_token(user, pass)
    "#{user} #{pass}"
  end

  private
  def user_and_pass
    cookie_token.split(' ')
  end

end
