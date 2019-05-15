import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleSaveSettings } from '../actions/settings';

export class Settings extends Component {

    state = {
        host: this.props.settings.host,
        user: this.props.settings.user,
        password: this.props.settings.password
    }

    render() {
        const { host, user, password } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Neteye URL (dummy=load dummy data)</Text>
                    <TextInput style={styles.inputs} placeholder='Enter neteye URL' value={host} onChangeText={txt => this.onHostChanged(txt)} style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Neteye API login name</Text>
                    <TextInput placeholder='Login name' value={user} onChangeText={txt => this.onUserChanged(txt)} style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput secureTextEntry={true} placeholder='Password' value={password} onChangeText={txt => this.onPasswordChanged(txt)} style={styles.input} />
                </View>

                 <Button title="Save" onPress={this.onSubmit} />

            </View>
        )
    }

    onSubmit = () => {
        const { host, user, password } = this.state
        this.props.saveSettings({
            host,
            user,
            password
        }).then(this.props.navigation.navigate('Home'))
    }

    onHostChanged = (host) => {
        this.setState({
            host
        })
    }

    onUserChanged = (user) => {
        this.setState({
            user
        })
    }


    onPasswordChanged = (password) => {
        this.setState({
            password
        })
    }
}


function mapStateToProps({ settings }) {
    return {
        settings
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        saveSettings: settings => dispatch(handleSaveSettings(settings))
    }
}


Settings.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding:20
    },

    label: {
        color: "#a9a9a9"
    },

    inputContainer: {
        width: 350,
        height: 55,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    inputs: {
        height: 45,
        borderBottomColor: '#FFFFFF',

        flex: 1,
    },
    
});
