import React from 'react'
import Field from '../components/Field'

export default class FieldsContainer extends React.Component {

 
    render () {

        return (
            <div>
                {this.props.fields.map(field => <Field key={field.id} field={field} filterField={this.props.filterField} />)}
            </div>
        )
    }




}