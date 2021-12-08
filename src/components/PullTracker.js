import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { fetchPack, recordPulls,testSignIn, fetchLocalPulls, addLocalPull, clearPulls, removeLocalPull } from "../actions";
import history from "../history";
import RisingStars from "../pics/RisingStars.png";
import Heavyweights from "../pics/Heavyweights.png"
import Veterans from "../pics/Veterans.png"
import Flashbacks from "../pics/Flashbacks.png"
import Harvest80 from "../pics/80harvest.png"
import Harvest92 from "../pics/92harvest.png"

class PackShow extends React.Component{
    constructor(props){
        super(props);
        this.state ={apiFetched: false}
    }
    
    componentDidUpdate(){
        if(!this.state.apiFetched){
            if(this.props.userId){
                
                this.setState({apiFetched: true});
                
                this.props.testSignIn(this.props.userId)
            }
        }
    }
    componentDidMount(){
        document.body.style.backgroundColor="lightgrey";
        this.props.fetchLocalPulls();
        this.props.fetchPack(this.props.match.params.id);
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
    submitPulls = async () =>{
        await this.props.recordPulls(this.props.match.params.id, this.props.pullsLocal)
        history.go();
    }
    renderPulls(){
        if (!this.props.pullsLocal){
            return <h1 className="ui centered header">Loading...</h1>
        }
        if(!this.props.userId){
            return <h1 className="ui centered header">Sign in to record personal stats...</h1>
        }
        const pullsList=[];
        for(const pull in this.props.pullsLocal){
            for (let i =0; i< this.props.pullsLocal[pull]; i++)
            pullsList.push(
                <div className="ui item fluid card" key={pull +i}>
                    <div className="ui center aligned content">{pull}</div>
                    <button className="ui basic red button" value={pull} onClick={e => this.removePull(e, "value")}>Delete</button>
                </div>
            )
        }
        return(
            <div className="ui ten doubling stackable cards">
                {pullsList}
            </div>
        )
    }
    renderPic(pack){
        if(pack ==="RisingStars"){
            return(RisingStars)
        } else if(pack==="Heavyweights"){
            return(Heavyweights)
        }else if(pack==="Veterans"){
            return(Veterans)
        }else if(pack==="Harvest80"){
            return(Harvest80)
        }else if(pack==="Harvest92"){
            return(Harvest92)
        }else{
            return(Flashbacks)
        }
    }
    renderPack(){
        if (!this.props.pack){
            return <div>Loading...</div>
        }

        const {title, avgOverall, lowestovr, highestovr, pulls} = this.props.pack
        const buttonList=[];
        for (let i=lowestovr; i<=highestovr; i++){
           buttonList.push(
                <div className="ui item fluid card" key={i}>
                    <button  type="submit" value={i} className="ui primary massive button" onClick={e => this.addPull(e, "value")}>{i}</button>
                </div>
           )             
        };
        const training = {80:110, 81:160, 82:230, 83:340, 84:490, 85:710, 86:1030, 87:1500, 88:2180, 89:3150, 90:5000, 91:7000, 92:10000, 93:13000, 94: 18000, 95:26000}
        const totalPulls=[]
        let total = 0
        let trainingTotal = 0
        for(let ovr in pulls){
            total += pulls[ovr]
            if(ovr > 95){
                trainingTotal += pulls[ovr]*training[95]
            } else{
                trainingTotal += pulls[ovr]*training[ovr]
            }
        }
        for(let ovr in pulls){
            totalPulls.push(
                <div className="ui blue fluid card" key ={ovr}>
                    <div className="ui center aligned content">
                      <div className="ui header"> {ovr} Ovr</div>
                      <div className="ui description">
                        Pull Percentage: {Math.round((pulls[ovr]/ total )*100)}%
                      </div>
                    </div>
                </div>
            )
        }
        return(
            <div className="ui two column padded doubling grid">
                <div className="ui centered three wide column">
                    <div className="ui eight wide column">
                        <div className="ui centered fluid card">
                            <div className="image">
                                <img src={this.renderPic(this.props.pack.picLocation)} alt="this is a test"/>
                            </div>
                            <div className="ui content">
                                <h1 className="ui centered aligned header">{title}</h1>
                                <div className="ui centered aligned extra meta">Community Average: {Math.round(avgOverall*100)/100}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui centered six wide column">
                    <header className="ui horizontal divider header">
                        Community Stats:
                    </header>
                    <div className="ui five douvling stackable centered cards">
                        {totalPulls}
                    </div>
                    <h2 className="ui header">
                        Average Training Return: {Math.round(trainingTotal/total*100)/100}
                    </h2>
                </div>
                <div className="ui centered six wide column">
                    {this.renderMyPack()}
                </div>
                <div className="ui centered fourteen wide column">
                    <div className="ui horizontal divider">
                        Record new pulls!:                    
                    </div>
                    <div className="ui ten doubling stackable centered aligned cards">
                        {buttonList}
                    </div>
                    {this.renderPulls()}
                    {this.renderSubmit()}
                </div>
            </div>
        )
    }
    renderSubmit(){
        if(!this.props.userId){
            return(<div></div>)
        }
        return(
            <div className="ui center align form">
                <div className="ui center aligned basic segment">
                    <button  className="ui centered button primary " onClick={e=>this.submitPulls()}>Submit Pulls</button>
                </div>
            </div>
        )
    }
    renderMyPack(){
        if(!this.props.userPulls){
            return(<h1 className="ui centered header">Sign in to see personal stats...</h1>)
        }
        const training = {80:110, 81:160, 82:230, 83:340, 84:490, 85:710, 86:1030, 87:1500, 88:2180, 89:3150, 90:5000, 91:7000, 92:10000, 93:13000, 94: 18000, 95:26000}
        let trainingTotal = 0
        const userPulls=[]
        // let total = 0
        let count = 0
        for(let pack in this.props.userPulls){
            if(pack === this.props.pack.title){
                for(let ovr in this.props.userPulls[pack]){
                    if(ovr>95){
                        trainingTotal += this.props.userPulls[pack][ovr]*training[95]
                    } else{
                        trainingTotal += this.props.userPulls[pack][ovr]*training[ovr]
                    }
                    // total += ovr*this.props.userPulls[pack][ovr];
                    count += this.props.userPulls[pack][ovr]
                    userPulls.push(
                        <div className="ui blue fluid card" key ={ovr}>
                            <div className="ui center aligned content">
                                <div className="ui header">{ovr} Ovr</div>
                                <div className="ui description">You have pulled {this.props.userPulls[pack][ovr]}</div>
                            </div>
                        </div>
                    )
                };
            }
            
        };
            
        return (
            <div>
                <div className="ui horizontal divider header">
                    Your pulls:                    
                </div>
                <div className="ui five doubling stackable centered cards">
                    {userPulls}
                </div>
                <h2 className="ui header">
                    Average Training Return: {Math.round((trainingTotal/count)*100)/100}
                </h2>
            </div>
        )
        

    }
    
    render() {
        return (
            <div className="ui">
                {this.renderPack()}
            </div>
        )
    }
}

const formWrapped = reduxForm({
    form: 'PackShow'
})(PackShow);

const mapStateToProps = (state, ownProps) =>{
    let newState = {
        userPulls: state.packs.userPulls ,
        pack: state.packs[ownProps.match.params.id],
        pullsLocal: state.local.pulls,
        userId: state.auth.userId,
    }
    return {
        ...newState
    }
}

export default connect(mapStateToProps, {fetchPack, recordPulls, testSignIn, fetchLocalPulls, addLocalPull, clearPulls, removeLocalPull})(formWrapped);