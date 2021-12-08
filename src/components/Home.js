import React from "react";
import { connect } from "react-redux";
import {fetchPacks} from "../actions";
import RisingStars from "../pics/RisingStars.png";
import Heavyweights from "../pics/Heavyweights.png"
import Veterans from "../pics/Veterans.png"
import Flashbacks from "../pics/Flashbacks.png"
import Harvest80 from "../pics/80harvest.png"
import Harvest92 from "../pics/92harvest.png"



class PackList extends React.Component{
    componentDidMount(){
        this.props.fetchPacks();
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
    renderList(){
        return this.props.packs.map(pack=>{
            if(pack.title){
                return(
                    <a className="ui fluid card link" key={pack._id} href={`/packs/${pack._id}`}>
                        <div className="image">
                            <img src={this.renderPic(pack.picLocation)} alt="this is a test"/>
                        </div>
                        <div className="header center aligned">{pack.title}</div>
                        <div className="description center aligned">Community Overall: {Math.round(pack.avgOverall*100)/100}</div>
                    </a>
                )

            } else{
                return(<div></div>)
            }
            
        })
    }
    render(){
        return (
            <div>
                <h1 className="ui header center aligned">Packs</h1>
                <div className="ui six doubling stackable centered cards">{this.renderList()}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        packs: Object.values(state.packs),
    };
};


export default connect(mapStateToProps, { fetchPacks })(PackList);