import React from 'react';
import Preview from './Preview';
import { List } from 'immutable';

export default class Frame extends React.Component {
  handleClick() {
    this.props.actions.changeActiveFrame(this.props['data-id']);
  }

  deleteFrame(e) {
    e.stopPropagation();
    if (this.props.active) {
      this.props.actions.deleteFrame(this.props['data-id']);
    }
  }

  duplicateFrame(e) {
    e.stopPropagation();
    if (this.props.active) {
      this.props.actions.duplicateFrame(this.props['data-id']);
    }
  }

  changeInterval(e) {
    e.stopPropagation();
    if (this.props.active) {
      this.props.actions.changeFrameInterval(
        this.props.index,
        this.refs.percentage.value
      );
    }
  }

  render() {
    return (
      <div
        className={`frame${this.props.active ? ' active' : ''}`}
        onClick={() => { this.handleClick(); }}
      >
        <Preview
          frames={List([this.props.frame])}
          columns={this.props.columns}
          rows={this.props.rows}
          cellSize={2}
          activeFrameIndex={0}
        />
        <div
          className="delete"
          onClick={(event) => { this.deleteFrame(event); }}
        />
        <div
          className="duplicate"
          onClick={(event) => { this.duplicateFrame(event); }}
        />
        <input
          type="number"
          value={this.props.frame.get('interval')}
          onChange={(event) => { this.changeInterval(event); }}
          className="frame__percentage"
          ref="percentage"
          disabled={this.props.lastFrame || !this.props.active}
        />
      </div>
    );
  }
}
