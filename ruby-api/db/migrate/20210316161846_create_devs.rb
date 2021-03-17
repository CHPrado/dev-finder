class CreateDevs < ActiveRecord::Migration[6.0]
  def change
    create_table :devs do |t|
      t.string :username, null: false
      t.string :notes
    end

    add_index :devs, :username, unique: true
  end
end
