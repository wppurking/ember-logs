class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at, :is_done, :is_archive
end
