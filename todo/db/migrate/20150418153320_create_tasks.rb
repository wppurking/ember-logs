class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :is_done, default: false
      t.boolean :is_archive, default: false

      t.timestamps null: false
    end
  end
end
