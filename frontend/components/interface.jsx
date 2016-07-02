import React from 'react';
import CSVInput from './csvInput.jsx';
import DataViewer from './dataViewer.jsx';
import Papa from 'papaparse';

class Interface extends React.Component {

  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this))
  }

  constructor(props) {
    super(props);

    this._bind('handleFileChange', 'handleDataChange','validate');

    this.state = {
      file: null,
      data: [],
      entriesWithErrors: 0,
      errorsAreHidden: 'true',
      columns: [],
      // keys are the headers in csv file, values are database column names
      fieldMapping: {
        fname: 'first_name',
        lname: 'last_name',
        address: 'address',
        city: 'city',
        state: 'state',
        zip: 'zip_code'
      }

    }
  }

  handleFileChange(file) {
    this.setState({file: file})
  }

  handleDataChange(data) {
    const that = this;
    $.ajax({
      url: "/users",
      method: "POST",
      data: {data: data.data, fieldMapping: this.state.fieldMapping},
      success: (data) => {
        let errorsAreHidden = data.entriesWithErrors > 0 ? '' : 'true';
        that.setState({data:data.validatedData, entriesWithErrors:data.entriesWithErrors, errorsAreHidden:errorsAreHidden});

        $('#validate-alert').show();
        $('#validate-alert').html('<div class="alert alert-success">File Validated!</div>');

        setTimeout( () => {
          $('#validate-alert').fadeOut()
        }, 3000);
      }
    });
  }

  validate() {
    if (this.state.file) {
      Papa.parse(this.state.file, {
        header: true,
        dynamicTyping: true,
        complete: this.handleDataChange
      });
    } else {
      $('#upload-alert').show();
      $('#upload-alert').html('<div class="alert alert-warning">Please upload a file</div>');
      setTimeout( () => {
        $('#upload-alert').fadeOut()
      }, 3000);
    }
  }

  render () {
    return (
      <div>
        <div id="upload-alert"></div>
        <div id="validate-alert"></div>
        <h3>Data Parser</h3>
        <CSVInput handleFileChange={this.handleFileChange} data={this.state.data}/>
        <button className='btn btn-primary pull-left' onClick={this.validate}>Validate</button>
        <br/>
        <div id="entries-with-errors"></div>
        <DataViewer data={this.state.data} fieldMapping = {this.state.fieldMapping} entriesWithErrors = {this.state.entriesWithErrors} errorsAreHidden = {this.state.errorsAreHidden} />
      </div>
    )
  }
}

export default Interface;

