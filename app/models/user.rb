class User < ActiveRecord::Base
  validates :first_name, :last_name, :address, :city, :state, :zip_code, presence: true

  def self.validate_user_data(user, datum)
    error_keys = user.valid? ? [] : user.errors.messages.keys
    has_errors = false
    validatedRow = datum.map do |k, v|
      errors = error_keys.include?(k.to_sym) ? k + ' ' + user.errors.messages[k.to_sym][0] : nil
      has_errors = true if errors
      { :value => v, :errors => errors }
    end
    [validatedRow, has_errors]
  end

end
