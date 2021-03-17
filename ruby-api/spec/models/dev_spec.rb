require 'rails_helper'

describe Dev, type: :model do
  it { expect(described_class.table_name).to eq('devs') }
end
