import React from 'react'
import Field from '../components/Field'

export default class FieldsContainer extends React.Component {

 
    render () {

        return (
            <div className="expert_fields">
                <div className="expert_fields_header">
                    <h4>Filter Questions</h4>
                </div>
                <div className="field_li" onClick={() => this.props.unfilterField()} >
                    <div className="inner_field_li">All</div>
                </div>
            
                {this.props.fields.map(field => <Field key={field.id} field={field} filterField={this.props.filterField} />)}
            </div>
        )
    }




}