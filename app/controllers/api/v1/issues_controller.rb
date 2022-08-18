#require 'rubygems'
require 'jira-ruby'
module Api
  module V1
    class IssuesController < Api::V1::JirvisApplicationController

      def initialize
        super
        credentials = Rails.application.credentials[:jira]
        site_config = credentials[:site]

        options = {
          :username => credentials[:user],
          :password => credentials[:api_key],
          :site => site_config,
          :context_path => '',
          :auth_type => :basic
        }
        Rails.logger.info "Got site:" + credentials[:site]
        Rails.logger.info "Got user:" + credentials[:user]
        @client = JIRA::Client.new(options)
      end

      def index 
        render json: @client.Issue.find()
      end

      def show 
        render json: @client.Issue.find(params[:id]);
      end


    end
  end
end
#ApplicationController
