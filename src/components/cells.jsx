import React from 'react';
import ReactDOM from 'react-dom';
var moment = require('moment');
var elemental = require('elemental');
var Button = elemental.Button;
var Form = elemental.Form;
var FormInput = elemental.FormInput;
var Glyph = elemental.Glyph;
var Checkbox = elemental.Checkbox;

export var TextCell = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            editing: false
        }
    },
    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
        this.props.valueChanged(this.props.childKey, event.target.value);
    },
    handleEditToggle: function (event) {
        event.preventDefault();
        this.setState({
            editing: !this.state.editing
        });
    },
    render: function () {
        var editGlyph = null;

        if (this.props.canWrite) {
            editGlyph = (<span onClick={this.handleEditToggle} className='CellEditIcon'>
                <Glyph icon='pencil'></Glyph>
            </span>)
        };

        if (this.props.clean) {
            this.state.value = this.props.value;
        }

        if (this.props.canWrite && this.state.editing === true) {
            // Read and write
            return (
                <span>
                    <Form onSubmit={this.handleEditToggle}>
                        <FormInput autofocus className='CellContent' type="text" value={this.state.value} onChange={this.handleChange}></FormInput>
                        {editGlyph}
                    </Form>
                </span>
            )
        } else {
            // Read only
            return (
                <span>
                    <span className='CellContent'>{this.state.value}</span>
                    {editGlyph}
                </span>
            )
        }
    }
});

export var LongTextCell = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            editing: false
        }
    },
    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
        this.props.valueChanged(this.props.childKey, event.target.value);
    },
    handleEditToggle: function (event) {
        event.preventDefault();
        this.setState({
            editing: !this.state.editing
        });
    },
    render: function () {
        var editGlyph = null;

        if (this.props.canWrite) {
            editGlyph = (<span onClick={this.handleEditToggle} className='CellEditIcon'>
                <Glyph icon='pencil'></Glyph>
            </span>)
        };

        if (this.props.clean) {
            this.state.value = this.props.value;
        }

        if (this.props.canWrite && this.state.editing === true) {
            // Read and write
            return (
                <span>
                    <Form onSubmit={this.handleEditToggle}>
                        <FormInput autofocus multiline className='CellContent' type="textarea" value={this.state.value} onChange={this.handleChange}></FormInput>
                        {editGlyph}
                    </Form>
                </span>
            )
        } else {
            // Read only
            return (
                <span>
                    <FormInput multiline className='CellContent ReadOnlyTextArea' type="textarea" value={this.state.value} readOnly={!this.state.editing}></FormInput>
                    {editGlyph}
                </span>
            )
        }
    }
});

export var NumberCell = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            editing: false
        }
    },
    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
        this.props.valueChanged(this.props.childKey, Number(event.target.value));
    },
    handleEditToggle: function (event) {
        event.preventDefault();
        this.setState({
            editing: !this.state.editing
        });
    },
    render: function () {
        var editGlyph = null;

        if (this.props.canWrite) {
            editGlyph = (<span onClick={this.handleEditToggle} className='CellEditIcon'>
                <Glyph icon='pencil'></Glyph>
            </span>)
        };

        if (this.props.clean) {
            this.state.value = this.props.value;
        }

        if (this.props.canWrite && this.state.editing === true) {
            // Read and write
            return (
                <span>
                    <Form onSubmit={this.handleEditToggle}>
                        <FormInput autofocus className='CellContent' type="number" value={this.state.value} onChange={this.handleChange}></FormInput>
                        {editGlyph}
                    </Form>
                </span>
            )
        } else {
            // Read only
            return (
                <span>
                    <span className='CellContent'>{this.state.value}</span>
                    {editGlyph}
                </span>
            )
        }
    }
});

export var BooleanCell = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value
        }
    },
    handleChange: function (value) {
        this.setState({
            value: value
        });
        this.props.valueChanged(this.props.childKey, value);
    },
    handleChecked: function (event) {
        this.handleChange(true);
    },
    handleUnchecked: function (event) {
        this.handleChange(false);
    },
    render: function () {
        var optionConfig = ((this.props.extras || {}).options || {});

        if (this.props.clean) {
            this.state.value = this.props.value;
        }

        if (this.state.value === true) {
            return (
                <span>
                    <Checkbox label={optionConfig.label || ""} className='CellContent' checked onChange={this.handleUnchecked}  disabled={!this.props.canWrite}/>
                </span>
            )
        } else {
            return (
                <span>
                    <Checkbox label={optionConfig.label || ""} className='CellContent' onChange={this.handleChecked}  disabled={!this.props.canWrite}/>
                </span>
            )
        }

    }
});

export var ImageCell = React.createClass({
    render: function () {
        return (
            <img
                src={this.props.value}
                width={this.props.extras.width}
                height={this.props.extras.height}>
            </img>
        );
    }
});

export var SelectCell = React.createClass({
    getInitialState: function () {
        return {}
    },
    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
        this.props.valueChanged(this.props.childKey, event.target.value);
    },
    render: function () {
        var optionConfig = this.props.extras.options;
        var options = [];

        if (this.props.clean) {
            this.state.value = this.props.value;
        }

        for (var i = 0; i < optionConfig.length; i++) {
            var option = optionConfig[i];
            options.push(
                <option key={i} value={option.value}>{option.title}</option>
            );
        };

        return (
            <select value={this.state.value || this.props.value} onChange={this.handleChange} disabled={!this.props.canWrite}>
                {options}
            </select>
        );
    }
});

export var DateCell = React.createClass({
    componentWillMount: function () {
        this.moment = moment(this.props.value).format("DD/MM/YY, h:mm:ss a");
    },
    render: function () {
        return (
            <div>{this.moment}</div>
        );
    }
});

export var TimeSinceCell = React.createClass({
    componentWillMount: function () {
        this.startMomentTicker();
    },
    getInitialState: function () {
        return {
            moment: moment(this.props.value).fromNow()
        }
    },
    startMomentTicker: function () {
        this.ticker = setInterval(function() {
            this.setState({
                moment: moment(this.props.value).fromNow()
            });
        }.bind(this), 1000);
    },
    componentWillUnmount: function () {
        clearInterval(this.ticker);
    },
    render: function () {
        return (
            <div>{this.state.moment}</div>
        );
    }
});

export var CurrencyCell = React.createClass({
    render: function () {
        return (
            <div>{this.props.extras.symbol}{this.props.value}</div>
        );
    }
});

export var ButtonCell = React.createClass({
    getInitialState: function () {
        return {
            disabled: this.props.extras.disabled || false,
            title: this.props.extras.title,
            type: this.props.extras.type || 'primary'
        }
    },
    action: function () {
        var $this = this;
        this.props.extras.action(this.props.rowKey, this.props.rowValue, function (newProps) {
            $this.setState(newProps || {});
        });
    },
    render: function () {
        return <Button onClick={this.action} disabled={this.state.disabled} type={this.state.type}>{this.state.title}</Button>
    }
});
