class UsersController < ApplicationController

  def create
    data = params['data']
    field_mapping = params['fieldMapping']
    rows_with_no_errors = []
    rows_with_errors = []
    data.each_with_index do |d,i|
      # replaces mapped keys
      datum = data[i.to_s].map {|k, v| [field_mapping[k], v] }.to_h
      user = User.new(datum)
      validation_result = User.validate_user_data(user, datum)

      validation_result[1] ? rows_with_errors << validation_result[0] : rows_with_no_errors << validation_result[0]
    end

    render json: { validatedData: rows_with_errors + rows_with_no_errors, entriesWithErrors: rows_with_errors.length }
  end

  def user_params
    params.require(:user).permit(:full_name, :last_name, :city, :state, :zip_code)
  end
end