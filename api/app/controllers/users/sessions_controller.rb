class Users::SessionsController < ApplicationController
  respond_to :json

  def create
    user = User.find_by_email(params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      sign_in(user)
      render json: { success: true, user: user }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      sign_out(current_user)
      render json: { message: "Logged out successfully." }, status: :ok
    else
      render json: { error: "No user logged in." }, status: :unauthorized
    end
  end

  private

  def respond_to_on_destroy
    if current_user
      render json: { message: "Logged out successfully." }, status: :ok
    else
      render json: { message: "User already logged out or not found." }, status: :unauthorized
    end
  end
end
