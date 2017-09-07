/* global fetch, btoa */

import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text, View, ListView, TextInput, TouchableOpacity} from 'react-native'

import Post from './src/post'

const URL = 'http://192.168.100.112:4444'

export default class GrendelMobile extends Component {
  constructor () {
    super()
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    let posts = ds.cloneWithRows([])
    this.state = {
      newPost: '',
      posts: posts
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          GRENDEL
        </Text>
        <View style={styles.newPost}>
          <TextInput
            onChangeText={(text) => this.setState({newPost: text})}
            placeholder='Nuevo Post'
            returnKeyType='go'
            style={styles.newPostInput}
          />
          <TouchableOpacity
            style={styles.newPostButton}
            onPress={this.onPost.bind(this)}
          >
            <Text style={styles.newPostButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.posts}>
          <ListView
            enableEmptySections
            dataSource={this.state.posts}
            renderRow={(rowData) => <Post url={URL} {...rowData} />}
            renderSeparator={(sectionId, rowId) => <View style={styles.separator} />}
          />
        </View>
      </View>
    )
  }

  async componentDidMount () {
    try {
      let request = await fetch(URL + '/posts')
      if (request.status >= 200 && request.status < 300) {
        let posts = await request.json()
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.setState({posts: ds.cloneWithRows(posts)})
      } else {
        let error = await request.text()
        console.log('Error 2', error)
      }
    } catch (e) {
      console.log('Error 1', e)
    }
  }

  async onPost () {
    await fetch(URL + '/post/' + btoa(this.state.newPost), {
      method: 'POST'
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#8b4b68'
  },
  title: {
    flex: 1,
    fontSize: 36,
    textAlign: 'center'
  },
  newPost: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 10
  },
  newPostInput: {
    flex: 2,
    textAlign: 'center'
  },
  newPostButton: {
    flex: 2,
    backgroundColor: '#000000'
  },
  newPostButtonText: {
    color: '#ffffff',
    textAlign: 'center'
  },
  posts: {
    flex: 5,
    paddingTop: 10
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#50777c'
  }
})

AppRegistry.registerComponent('GrendelMobile', () => GrendelMobile)
