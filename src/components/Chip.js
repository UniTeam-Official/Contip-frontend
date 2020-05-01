/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

export class Chip extends Component {
  handleClick() {
    this.props.handleChipClose(this.props.id);
  }

  render() {
    return (
      <div className="chip">
        <span className="chip-text">
          { this.props.name }
        </span>
        <a className="chip-remove no-border-btm" onClick={ this.handleClick.bind(this) }></a>
      </div>
    )
  }
}

export default Chip
