import React, { Component } from 'react'
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadServices } from '../actions/services'
import ServiceTile from '../components/ServiceTile'
import PropTypes from 'prop-types'
import ReloadButton from '../components/ReloadButton';
import { handleLoadSettings } from '../actions/settings';

export class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Dashboard`,
      headerRight: (
        <ReloadButton onPress={navigation.getParam('loadData')} />
      ),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ loadData: this.loadData })
    this.loadSettings().then(() => {
      if (this.props.settings && this.props.settings.host) {
        this.loadData()
      } else {
        this.props.navigation.navigate('Settings')
      }
    })
  }

  loadSettings = () => {
    const { dispatchLoadSettings } = this.props
    return dispatchLoadSettings()
  }

  loadData = () => {
    const { dispatchLoadServices, settings } = this.props
    dispatchLoadServices(settings)
  }


  renderServiceTile = (key) => {
    const { navigate } = this.props.navigation
    const { services } = this.props
    const service = services.find(obj => obj.__name === key)
    return (

      <ServiceTile
        service={service}
        onPress={() => navigate('Service', { serviceId: key, title: `${service.host_name}: ${service.display_name}` })}
      />

    )
  }

  ListEmptyComponent = () => {
    const { error } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {error.isError === true
          ? <Text style={styles.infoText} >{`An error occured: ${error.error}}`} </Text>
          : <Text style={styles.infoText} >No data found</Text>
        }
      </View>)
  }

  render() {
    const { loading, services } = this.props
    const listData = services ? services.map(service => ({ key: service.__name })) : []
    return (
      <View style={styles.dashboard}>
        {loading
          ? (<ActivityIndicator size="large" />)
          : (<FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={listData}
            renderItem={({ item }) => this.renderServiceTile(item.key)}
            ListEmptyComponent={this.ListEmptyComponent}
          />)
        }
      </View>
    )
  }
}

function mapStateToProps({ services, loading, error, settings }) {
  return {
    services,
    settings,
    loading,
    error
  }
}



const mapDispatchToProps = dispatch => {
  return {
    dispatchLoadSettings: () => dispatch(handleLoadSettings()),
    dispatchLoadServices: settings => dispatch(handleLoadServices(settings)),
  }
}



Home.propTypes = {
  services: PropTypes.array,
  loading: PropTypes.bool,
  dispatchLoadSettings: PropTypes.func.isRequired,
  dispatchLoadServices: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  dashboard: {
    display: 'flex'
  },

  infoText: {

  },

  services: {

  },

  list: {

  },

  listContent: {

  },


})

export default connect(mapStateToProps, mapDispatchToProps)(Home)