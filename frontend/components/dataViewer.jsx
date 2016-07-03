import React from 'react';
import Paginator from 'react-pagify';
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
      errorsAreHidden: 'true'
    };

    this.perPageValueList = [10, 25, 50, 100];
  }

  onSelect(page) {
    const pagination = this.state.pagination || {};
    pagination.page = page;
    this.setState({
      pagination: pagination
    });
  }

  onPerPage(e) {
    const pagination = this.state.pagination || {};

    pagination.perPage = parseInt(e.target.value, 10);

    this.setState({
      pagination: pagination
    });
  }

  _buildPerPageDropdown() {
    return this.perPageValueList.map( (val, idx) => {
      return <option key={idx} value={val.toString()}>{val}</option>;
    });
  }

  render() {
    const paginated = Paginator.paginate(this.props.data, this.state.pagination);
    return (
      <div id="file-viewer">
        <div id='per-page-container' className="clearfix">
          <br/>
          <span>Per page</span>
          <div className="col-md-1 no-left-padding">
            <select type="c-select" className="form-control" value={this.state.pagination.perPage} onChange={this.onPerPage}>
              {this._buildPerPageDropdown()}
            </select>
          </div>
        </div>

        <Paginator
          className='pagify-pagination no-left-margin'
          ellipsesClassName='pagify-ellipsis'
          activeClassName='selected'
          inactiveClassName='inactive'
          page={paginated.page}
          pages={paginated.amount}
          beginPages={3}
          endPages={3}
          sidePages={1}
          showPrevNext={true}
          alwaysShowPrevNext={true}
          prevButton={'Prev'}
          nextButton={'Next'}
          ellipsisButton={'…'}
          onSelect={this.onSelect}>
        </Paginator>
        <span id="entries-with-errors" hidden={this.props.errorsAreHidden}>{this.props.errorResultMessage}</span>
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
