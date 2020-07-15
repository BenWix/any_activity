class CreateConditions < ActiveRecord::Migration[6.0]
  def change
    create_table :conditions do |t|
      t.string :weather
      t.integer :max_temp
      t.integer :min_temp
      t.integer :activity_id

      t.timestamps
    end
  end
end
