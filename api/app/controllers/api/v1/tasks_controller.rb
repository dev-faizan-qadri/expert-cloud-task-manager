class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: %i[update destroy]

  def index
    @tasks = current_user.tasks.order(created_at: :desc).page(params[:page]).per(10)
    render json: {
      tasks: @tasks,
      current_page: @tasks.current_page,
      total_pages: @tasks.total_pages,
      total_count: @tasks.total_count
    }
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description)
  end
end
