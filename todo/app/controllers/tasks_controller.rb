class TasksController < ApplicationController
    def index
        # for test dev
        tasks = Task.all
        render json: tasks, root: 'todos'
    end

    def create
        task = Task.new(save_task_params)
        if task.save
            render json: task, root: 'todos'
        else
            render json: {errors: task.errors}, status: 422
        end
    end

    def show
        task = Task.find(params[:id])
        render json: task, root: 'todos'
    rescue ActiveRecord::RecordNotFound => e 
        render json: {errors: {exception: e.message}}, status: 422
    end

    def update
      task = Task.find(params[:id])
      if task.update(update_task_params)
        render json: task, root: 'todos'
      else
        render json: {errors: task.errors}, status: 422
      end
    end

    def destroy
      task = Task.find(params[:id])
      if task.destroy
        render json: task, root: 'todo'
      else
        render json: {errors: {message: 'delete faild.'}}
      end
    end


    def update_task_params
      params.permit(:title, :is_done, :is_archive)
    end

    def save_task_params
        params.require(:todo).permit(:title)
    end
end
