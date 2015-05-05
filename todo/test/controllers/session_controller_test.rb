require 'test_helper'

class SessionControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "login in" do
    post :create, email: 'wyatt', password: '132456'
    assert_response :success, %q({"users":{"email":"wyatt"}})
  end

  test "login fail" do
    post :create, email: 'wyatt', password: '132456'
    assert_response :success, %q({"errors":{"email":["User or password is invalid."]}}})
  end

  test "logout" do
    # login first
    post :create, email: 'wyatt', password: '132456'
    assert_response :success, %q({"users":{"email":"wyatt"}})

    #logout
    delete :destroy
    assert_response :success, %q({"status":{"success":"Success log out"}})
  end
end
