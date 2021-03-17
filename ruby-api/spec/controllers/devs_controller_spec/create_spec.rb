require 'rails_helper'

describe DevsController, type: :request do
  context 'create route' do
    let(:dev) { build(:dev) }
    let(:params) { { dev: { username: dev.username, notes: dev.notes }} }
    let(:result) { JSON.parse(response.body) }
    before { post '/devs', params: params }

    it 'request index and return 200 OK' do
      expect(response.code).to eq('200')
      expect(response).to have_http_status(:ok)
    end

    it 'displays dev saved data' do
      expect(Dev.all.count).to eq(1)
      expect(result["username"]).to eq(dev.username.upcase)
      expect(result["notes"]).to eq(dev.notes)
      expect(result["message"]).to eq('Notes saved!')
    end

    context 'when try to save notes from same username' do
      let(:params) { { dev: { username: dev.username, notes: 'updated notes' }} }

      it 'does not create a new Dev but update its notes attribute' do
        expect(Dev.all.count).to eq(1)
        expect(result["username"]).to eq(dev.username.upcase)
        expect(result["notes"]).to eq('updated notes')
        expect(result["message"]).to eq('Notes saved!')
      end
    end
  end
end
