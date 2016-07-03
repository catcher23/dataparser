class UsersController < ApplicationController

  def create
    data = params['data']
    field_mapping = params['fieldMapping']
    rows_with_no_errors = []
    rows_with_errors = []

    data.each_with_index do |d,i|
      # replaces mapped keys
      datum = data[i.to_s].map {|k, v| [field_mapping[k], v] }.to_h
       # skips empty lines
      if datum.length == field_mapping.length
        user = User.new(datum)
        validated_row, has_errors = User.validate_user_data(user, datum)
        has_errors ? rows_with_errors << validated_row : rows_with_no_errors << validated_row

        begin
          user.save
        rescue ActiveRecord::RecordNotUnique => e
          next if(e.message =~ /unique.*constraint.*index_users_on_first_name_and_last_name_and_address/)
          raise
        end

      end
    end

    render json: { validatedData: rows_with_errors + rows_with_no_errors, entriesWithErrors: rows_with_errors.length }
  end

  def user_params
    params.require(:user).permit(:full_name, :last_name, :city, :state, :zip_code)
  end
end