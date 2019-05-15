import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { formatTimeStamp } from '../utils/helpers';
import { CYAN, GRAY } from '../styles/colors';

const ServiceTile = (props) => {
    const { service, onPress } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style.container}>
                
                <View style={stateToStyle(service.state)}></View>

                <View style={style.lastResult}>
                    <Text>
                        {service.status}
                    </Text>
                    <Text>
                        {formatTimeStamp(service.timestamp)}
                    </Text>
                </View>

                <View style={style.wrapper}>
                    <Text style={style.serviceTitle}>
                        {`${service.host_name}: ${service.display_name}`}
                    </Text>
                    <Text style={style.output}>
                        {service.output}
                    </Text>
                </View>
            </View>

        </TouchableOpacity >
    )
}

ServiceTile.propTypes = {
    service: PropTypes.object.isRequired,
    onPress: PropTypes.func
}

stateToStyle = (state = 3) => {
    return [style.statusOk, style.statusCritical, style.statusError, style.statusUnknown][state]
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:5
    },

    lastResult: {
        display:'flex',
        alignItems: 'center',
    },

    wrapper: {
        padding: 2
    },

    statusOk: {
        width: 10,
        backgroundColor: 'green'
    },

    statusCritical: {
        width: 10,
        backgroundColor: 'orange'
    },

    statusError: {
        width: 10,
        backgroundColor: 'red'
    },

    statusUnknown: {
        width: 10,
        backgroundColor: 'gray'
    },

    serviceTitle: {
        color: CYAN
    },

    output: {
        color: GRAY
    }
})

export default ServiceTile