import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ServiceTile from '../components/ServiceTile';


export class Service extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    }
  }

  render() {
    return (
      <View>
        <ServiceTile service={this.props.service}/>
      </View>
    )
  }
}

function mapStateToProps({ services }, { navigation }) {
  const serviceId = navigation.getParam('serviceId')
  return {
    service: services.find(srv => srv.__name === serviceId),
  }
}

Service.propTypes = {
  service: PropTypes.object,
}

const styles = StyleSheet.create({
  
}) 

export default connect(mapStateToProps)(Service)