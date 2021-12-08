import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { fetchLocalPulls, addLocalPull, clearPulls, removeLocalPull } from "../actions";

class LocalPackShow extends React.Component{ 
    componentDidMount(){
        this.props.fetchLocalPulls();
        // console.log(this.props)
    }  

    addPull =(e) =>{
        const value = e.target.value 
        this.props.addLocalPull(value);
    }
    removePull= (e)=>{
        const value = e.target.value;
        this.props.removeLocalPull(value);
    }
    clearPulls=()=>{
        this.props.clearPulls();
    }
    renderPulls(){
        if (!this.props.pulls){
            return <div>Loading...</div>
        }
        const pullsList=[];
        for(const pull in this.props.pulls){
            for (let i =0; i< this.props.pulls[pull]; i++)
            pullsList.push(
                <div className="ui item card" key={pull +i}>
                    <div className="ui center aligned content">{pull}</div>
                    <button className="ui basic red button" value={pull} onClick={e => this.removePull(e, "value")}>Delete</button>
                </div>
            )
        }
        return(
            <div className="ui ten doubling cards">
                {pullsList}
            </div>
        )
    }
    
    
    render() {
        // console.log(this.props.pulls)
        const buttonList=[];
        for(let i =0; i<6; i++){
            buttonList.push(
                <div className="ui item card" key={i}>
                    <button  type="submit" value={i} className="ui basic massive button" onClick={e => this.addPull(e, "value")}>{i}</button>
                </div>
           )   
        }
        return (
            <div className="ui container">
                <div className="ui horizontal divider">
                    Record new pulls!:                    
                </div>
                <div className="ui centered aligned card">
                    <button  type="submit" className="ui basic massive button" onClick={e => this.clearPulls()}>Clear Pulls</button>
                </div>
                <div className="ui ten doubling centered aligned cards">
                    {/* <Field name="highestovr" component={i} label="Enter Highest Possible Overall" /> */}
                    {buttonList}
                </div>
                {this.renderPulls()}
            </div>
            
        )
    }
}

const formWrapped = reduxForm({
    form: 'LocalPackShow'
})(LocalPackShow);

const mapStateToProps = (state) =>{
    return {
        pulls: state.local.pulls
    }
}

export default connect(mapStateToProps, {fetchLocalPulls, addLocalPull, clearPulls, removeLocalPull})(formWrapped);