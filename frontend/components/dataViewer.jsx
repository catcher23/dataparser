import React from 'react';
import ReactTooltip from 'react-tooltip';

class DataViewer extends React.Component {
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) )
  }

  constructor(props) {
    super(props);

    this._bind('onSelect', 'onPerPage');

    this.state = {
      pagination: {
        page: 0,
        perPage: 10
      },
      errorsAreHidden: this.props.errorsAreHidden
    };
  }

  render() {
    return (
      <div id="file-viewer">
        <div id='per-page-container' className="clearfix">
          <br/>
          <span>Per page</span>
          <div className="col-md-1 no-left-padding">
          </div>
        </div>

        <span id="entries-with-errors" hidden={this.props.errorsAreHidden} >You have {this.props.entriesWithErrors} entries with errors. They are listed first.</span>
        <Table data={paginated.data} fieldMapping = {this.props.fieldMapping}/>
      </div>
    )
  }
}

class Table extends React.Component {
  render() {
    return (
      <div className="fileContents">
        <table className="table table-striped table-hover table-viewer" style={{'borderCollapse': 'collapse'}}>
          <Head fieldMapping={this.props.fieldMapping}/>
          <Body data={this.props.data} columns={this.props.fieldMapping}/>
        </table>
      </div>
    )
  }
}

class Head extends React.Component {
  render() {
    return (
      <thead>
      <tr>
        {Object.keys(this.props.fieldMapping).map( (columnName) => {
          return <th key={columnName}>
            <div className="row" style={{'textAlign': 'center'}}>{columnName}</div>
            <div className="row" style={{'textAlign': 'center', 'fontSize':'75%', 'color': '#aaa'}}>(maps to '{this.props.fieldMapping[columnName]}')</div>
          </th>
        })}
      </tr>
      </thead>
    )
  }
}

class Body extends React.Component {
  render() {
    return (
      <tbody>
      {this.props.data.map( (row, idx) => {
        return <Row key={idx} data={row} columns={this.props.columns} />
      })}
      </tbody>
    )
  }
}

class Row extends React.Component {
  render() {
    return (
      <tr>
        {Object.keys(this.props.columns).map( (h, i) => {
          return <Cell key={h} datum = {this.props.data[i]} rowNumber={i} column={h}/>
        })}
      </tr>
    )
  }
}

class Cell extends React.Component {
  render() {
    const cellId = this.props.rowNumber + "-" + this.props.column;
    return (
      <td key={cellId} data-tip={this.props.datum.errors} data-for={cellId} style={this.props.datum.errors ? {'backgroundColor':'rgba(242, 222, 222, 1)'} : {}}>
        <ReactTooltip id={cellId}/>
        {this.props.datum.value}
      </td>
    )
  }

}

export default DataViewer;
