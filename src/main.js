import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import Header from './common/header';
import LoginForm from './loginForm';
import CardSection from './common/cardSection';
import Spinner from './common/spinner';
import Button from './common/button';

class Main extends Component {
    state = { loggedIn: null };
    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyCeZ8-jnjLeEsf21w3VWz3pK8E0xwrqIpI',
            authDomain: 'kimlikdogrulama-f7340.firebaseapp.com',
            databaseURL: 'https://kimlikdogrulama-f7340.firebaseio.com',
            projectId: 'kimlikdogrulama-f7340',
            storageBucket: 'kimlikdogrulama-f7340.appspot.com',
            messagingSenderId: '855512671743'
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }
    clickLogout() {
        firebase.auth().signOut();
    }
    renderContent() {
        switch (this.state.loggedIn) {
            case true:
            return (
                <CardSection>
                    <Button onPress={this.clickLogout.bind(this)}> LOGOUT </Button>
                </CardSection>
            );        
            case false:
            return (
                <LoginForm />
            );
            default: 
            return (
                <View>
                    <Spinner />
                </View>
            );
        }
    }
    render() {
        return (
            <View>
                <Header headerText={"Login Page"} />
                {this.renderContent()}
            </View>
        );
    }
}

export default Main;