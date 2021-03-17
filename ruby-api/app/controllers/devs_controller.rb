class DevsController < ApplicationController
  def index
    devs = Dev.all

    render json: devs
  end

  def show
    dev = Dev.where(username: params[:username].upcase).first

    render json: dev
  end

  def create
    dev = Dev.new(dev_params)

    Dev.upsert(dev.attributes, unique_by: :username)
    render json: { message: "Notes saved!", username: dev.username, notes: dev.notes }
  end

  def dev_params
    dev_params = params.require(:dev).permit(:username, :notes)
    dev_params = { username: dev_params[:username].upcase, notes: dev_params[:notes] }
  end
end
