require 'rails_helper'

describe DevsController, type: :request do
  let!(:devs) { create_list(:dev, 10) }

  context 'index route' do
    let(:result) { JSON.parse(response.body) }
    before { get '/devs' }

    it 'request index and return 200 OK' do
      expect(response.code).to eq('200')
      expect(response).to have_http_status(:ok)
    end

    it 'displays all devs data' do
      expect(Dev.all.count).to eq(10)
      expect(result.count).to eq(10)
      expect(result.first["username"]).to eq(Dev.first.username)
    end
  end
end
