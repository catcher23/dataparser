class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :first_name, :default => nil
      t.string :last_name, :default => nil
      t.string :address, :default => nil
      t.string :city, :default => nil
      t.string :state, :default => nil
      t.string :zip_code, :default => nil
      t.timestamps
    end
    add_index :users, [:first_name, :last_name, :address], :unique => true
  end

  def self.down
    drop_table :users
  end
end
