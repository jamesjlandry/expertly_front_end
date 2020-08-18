import React from 'react'

export default class Field extends React.Component {


    render () {

        return (
            <div>
                <div onClick={() => this.props.filterField(this.props.field.id)}>{this.props.field.field_type}</div>
            </div>
        )
    }




}