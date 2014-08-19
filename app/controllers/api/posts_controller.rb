class Api::PostsController < ApplicationController

  def index
    posts = Post.all
    render json: posts
  end

  def create
    post = Post.new(post_params)

    if post.save
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find(params[:id])

    if post.update(post_params)
      render json: post
    else
      render json: 'That post does not exist!', status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])

    if post
      post.destroy
      render json: post
    else
      render json: 'That post does not exist!', status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

end
