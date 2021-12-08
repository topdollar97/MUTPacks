import React from "react";
import history from "../history";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createPack, testSignIn} from "../actions";


class NewPackForm extends React.Component {
    renderInput(formProps){
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input { ...formProps.input } />
            </div>
            
        )
    }


    onSubmit = (formValues) =>{
        if(this.props.userId ==="112657973511157148478"){
            this.props.createPack({...formValues});
            history.push("/");
        } else(
            history.push("/")
        )       
    }

    render(){
        if(this.props.userId !=="112657973511157148478"){
            return(
                <header className="ui center aligned header">Please Login as Admin to create a pack.</header>
            )
        } else if(this.props.userId !=="112657973511157148478" && this.props.userId !== "114923204529438975424"){
            return(
                <header className="ui center aligned header">Please Login as Admin to create a pack. {this.props.userId}</header>
            )
        } else{
            return(
                <div className="ui container">
                    <h1 className="ui center aligned header">Create a new pack:</h1>
                    <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name="title" component={this.renderInput} label="Enter Pack Name" />
                        <Field name="picLocation" component={this.renderInput} label="Enter Picture Location" />
                        <Field name="highestovr" component={this.renderInput} label="Enter Highest Possible Overall" />
                        <Field name="lowestovr" component={this.renderInput} label="Enter Lowest Possible Overall" />
                        <button className="ui button primary" type="submit">Submit</button>
                    </form>
                </div>
            )
        }
    };
}


const formWrapped = reduxForm({
    form: 'NewPackForm'
})(NewPackForm);

const mapStateToProps = (state) =>{
    return { 
        userId: state.auth.userId,
    };
};

export default connect(mapStateToProps, {createPack, testSignIn})(formWrapped);
