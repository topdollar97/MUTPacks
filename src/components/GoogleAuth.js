import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, testSignIn } from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: "secret",
                scope: 'email'
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = async() =>{
        await this.auth.signIn();
    };

    onSignOutClick = () =>{
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn ===null){
            return null;
        } else if (this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui green google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render(){
        return <div className="ui item">{this.renderAuthButton()}</div>;
    }
}

const mapStatetoProps = state =>{
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStatetoProps, { signIn, signOut, testSignIn })(GoogleAuth);
