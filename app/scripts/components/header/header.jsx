﻿var utils = require('../../utils/utils');
var propTypes = require("../../utils/propTypes");

var React = require('react');
var Select = require('react-select');

var Header = React.createClass({
	propTypes: {
		startDate: propTypes.date.isRequired,
		goAnotherWeek: React.PropTypes.func.isRequired,
		goAnotherMonth: React.PropTypes.func.isRequired,
		goAnotherYear: React.PropTypes.func.isRequired,
		months: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		earliestYear: React.PropTypes.number.isRequired,
		latestYear: React.PropTypes.number.isRequired
	},
	optionsCreator: function (value) {
		var val = parseInt(value);
		return { value: val, label: val.toString(), create: true };
	},
	render: function () {
		var startDay = this.props.startDate.getDate();
		var endDay = utils.addDays(this.props.startDate, 7 /*days in a week*/).getDate();

		var goAnotherWeek = this.props.goAnotherWeek;
		var months = [];
		for (var i = 0; i < this.props.months.length; i++) {
			months.push({ value: i, label: this.props.months[i] });
		}
		var years = [],
			earliestYear = this.props.earliestYear,
			latestYear = this.props.latestYear;
		var currentYear = this.props.startDate.getFullYear(),
			todaysYear = new Date().getFullYear(),
			minDdYearsDiff = 5/*see specs*/;
		var ddStartYear = currentYear > earliestYear ? earliestYear : currentYear,
			ddEndYear = todaysYear + minDdYearsDiff < latestYear ? latestYear : todaysYear + minDdYearsDiff;
		for (var i = ddStartYear; i <= ddEndYear; i++) {
			years.push({value: i, label: i.toString()});
		}
		return (
			<div className="rc-header">
				<div className="rc-week">
					<div className="rc-icon-wrapper"><span className="rc-icon rc-icon-left-arrow" onClick={goAnotherWeek.bind(null,false)}></span></div>
					<span className="rc-date">{startDay}-{endDay}</span>
					<div className="rc-icon-wrapper"><span className="rc-icon rc-icon-right-arrow" onClick={goAnotherWeek.bind(null,true)}></span></div>
				</div>
				<div className="rc-options">
					<div className="rc-month">
						<Select options={months} value={this.props.startDate.getMonth()} onChange={this.props.goAnotherMonth}
							searchable={false} clearable={false}/>
					</div>
					<div className="rc-years">
						<Select options={years} value={currentYear} onChange={this.props.goAnotherYear} clearable={false} allowCreate={true}
								newOptionCreator={this.optionsCreator}/>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = Header;