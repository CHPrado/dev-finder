require 'rails_helper'

describe DevsController, type: :request do
  let!(:devs) { create_list(:dev, 10) }

  context 'show route' do
    let(:dev) { devs.first }
    let(:params) { { username: dev.username } }
    let(:result) { JSON.parse(response.body) }
    before { get "/devs/#{dev.username}" }

    it 'request show and return 200 OK' do
      expect(response.code).to eq('200')
      expect(response).to have_http_status(:ok)
    end

    it 'returns dev data' do
      expect(Dev.all.count).to eq(10)
      expect(result["username"]).to eq(dev.username.upcase)
      expect(result["notes"]).to eq(dev.notes)
      expect(result["notes"]).to eq(dev.notes)
    end
  end
end
