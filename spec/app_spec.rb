require 'rails_helper'

describe User, :type => :model do
  subject { described_class.new }

  it "is not valid without any attributes" do
    expect(subject).to_not be_valid
  end

  it "is valid with valid attributes" do
    subject.first_name = "John"
    subject.last_name = "Doe"
    subject.city = "Fremont"
    subject.state = "CA"
    subject.zip_code = "94539"
    subject.address = "111 Street"
    expect(subject).to be_valid
  end

  it "is not valid without a zip code" do
    subject.first_name = "John"
    subject.last_name = "Doe"
    subject.city = "Fremont"
    subject.state = "CA"
    subject.address = "111 Street"
    expect(subject).to_not be_valid
  end
end

describe "POST Users", :type => :request do
    it "retuns the correct JSON response" do
      params = {
            :data => {"0" =>
                              {:fname   =>"Tyson",
                               :lname   =>"Hilpert",
                               :address =>"Collier Trafficway",
                               :city    =>"Marceloshire",
                               :state   =>"AZ",
                               :zip     =>"42080"},
                      "1" =>
                              {:fname   =>"Everardo",
                               :lname   =>"Casper",
                               :address =>"Sammie Ridge",
                               :city    =>"East Christina",
                               :state   =>"LA",
                               :zip     =>"91049"}},
            :fieldMapping =>  {:fname   =>"first_name",
                               :lname   =>"last_name",
                               :address =>"address",
                               :city    =>"city",
                               :state   =>"state",
                               :zip     =>"zip_code"}
      }

      post "/users", params
      expect(JSON.parse(response.body).length).to eq(2)
  end
end