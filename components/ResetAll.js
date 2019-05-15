import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Button } from 'react-native'
import { handleResetAll } from '../actions/shared'
import TextButton from './TextButton'
import PropTypes from 'prop-types'

class ResetAll extends Component {
    render() {
        const { dispatchResetAll, navigation } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.warning}>WARNING! You are about to delete all of your data</Text>
                <View style={styles.button} >
                    <Button style={styles.button} title="Reset Local Store" style={styles.textButton} onPress={() => dispatchResetAll().then(() => { navigation.goBack() })} />
                </View>
                <TextButton onPress={() => { navigation.goBack() }}>
                    Cancel
                </TextButton>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchResetAll: () => dispatch(handleResetAll())
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    warning: {
        color: "#ff0000"
    },

    button: {
        padding: 40
    },

    textButton: {
        padding: 10,
        borderColor: "#ffffff",
        margin: 2,
        width: 120,
        borderWidth: 1,
        borderRadius: 2
    },

})

ResetAll.propTypes = {
    dispatchResetAll: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(ResetAll)
