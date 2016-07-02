import React from 'react';
import ReactDOM from 'react-dom';

class CSVInput extends React.Component {

  constructor(props, refs) {
    super(props, refs);

    this.handleChange = this.handleChange.bind(this);
    this.state = {filename: ""};
  }

  handleChange() {
    const file = ReactDOM.findDOMNode(this.refs.csv).files[0];
    if(!file) {
      return;
    }
    this.setState({filename: file.name});
    this.props.handleFileChange(file);
  }

  render() {
    return (
      <div id="csv-select">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="file" className="control-label col-md-1">File</label>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-btn">
                  <span className="btn btn-primary btn-file">
                    Browse <input type="file" id="file" accept=".csv, .tsv, .txt" onChange={this.handleChange} ref="csv" />
                  </span>
                </span>
                <input type="text" value={this.state.filename} className="form-control" readOnly />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CSVInput;
