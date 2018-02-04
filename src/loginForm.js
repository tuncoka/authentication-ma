import React, { Component } from 'react';
import { TextInput, Alert } from 'react-native';
import firebase from 'firebase';
import Button from './common/button';
import Card from './common/card';
import CardSection from './common/cardSection';
import Spinner from './common/spinner';

class LoginForm extends Component {
    state = { email: '', password: '', loading: false };
    clickLogin() {
        this.setState({ loading: true });
        const { email, password } = this.state;
        if ( this.state.email === '' || this.state.password === '') {
            this.setState({ loading: false });
            Alert.alert(
                'ERROR',
                'E-mail or password cannot be empty!',
                [
                   { text: 'OK', onPress: () => null } 
                ]
            );
        } else {
            console.log('email: '+this.state.email);
            console.log('passwd: '+this.state.password);
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.loginSuccess.bind(this))
            .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.loginSuccess.bind(this))
            .catch(this.loginFail.bind(this));
            });
        }        
    }
    loginSuccess() {
        console.log('success');
        this.setState({ loading: false });
    }
    loginFail() {
        console.log('fail');
        this.setState({ loading: false });
        Alert.alert(
            'ERROR',
            'E-mail or password is invalid!',
            [
               { text: 'OK', onPress: () => null } 
            ]
        );
    }
    renderButton() {
        if(!this.state.loading) {
            return <Button onPress={this.clickLogin.bind(this)}> LOGIN </Button>;
        }
        return <Spinner size="small" />;
    }
    render() {
        const { inputStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <TextInput
                        placeholder="E-Mail"
                        style={inputStyle}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        style={inputStyle}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    }
}

export default LoginForm;