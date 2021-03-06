﻿'use strict';

var utils = require('../../utils/utils');
var propTypes = require("../../utils/propTypes");

var React = require('react');
var ReactDOM = require("react-dom");
var createReactClass = require( 'create-react-class' );
var PropTypes = require( 'prop-types' );

var Timing = createReactClass({
  propTypes:{
    timing: PropTypes.object.isRequired,
    timeProperties: propTypes.timingsTimeProperties.isRequired,
    readOnly: PropTypes.bool.isRequired,
    remove: PropTypes.func,
    onResizerMouseDown: PropTypes.func
  },
  calculateStyles: function(){
    var thisNode = ReactDOM.findDOMNode(this);
    var height = thisNode.parentNode.clientHeight / this.props.timeProperties.allMinutes;

    var top = height * this.props.timeProperties.startMinutesDifference ;
    var bottom = height * this.props.timeProperties.endMinutesDifference;

    var style = 'top:' + top + 'px; height:' + (bottom - top - 2) + 'px;';
    thisNode.style.cssText = style;
  },
  componentDidMount: function () {
    this.calculateStyles.call(this);
  },
  componentDidUpdate: function () {
    this.calculateStyles.call(this);
  },
  render: function () {

    var timeClassNames = this.props.readOnly ? 'rc-time rc-readonly' : 'rc-time',

      resizerClassNames = 'rc-event-resizer', closeClassNames = 'rc-event-icon rc-icon rc-icon-close',

      minutesSpan = this.props.timeProperties.endMinutesDifference - this.props.timeProperties.startMinutesDifference;

    if ( minutesSpan <= 30 ) {

      timeClassNames += ' rc-above';
      resizerClassNames += ' rc-below';
      closeClassNames += ' rc-above';

    }

    return (
      <div className="rc-event" onMouseDown={this.props.onTimingMouseDown}>
        <div className={timeClassNames}>
          <span className="start">{utils.formatTime(this.props.timing.start)}</span> - <span className="end">{utils.formatTime(this.props.timing.end)}</span>
        </div>
        {this.props.readOnly ? undefined : <div className={resizerClassNames} data-nodrag="1" onMouseDown={this.props.onResizerMouseDown}></div>}
        {this.props.readOnly ? undefined : <div className={closeClassNames} data-nodrag="1" onClick={this.props.remove.bind(null,this.props.timing)}></div>}
      </div>
    );
  }
});

module.exports = Timing;