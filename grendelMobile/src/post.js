
import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Post extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    let date = new Date(props.created_at)
    let visualDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

    this.state = {
      url: props.url,
      id: props.id,
      content: props.content,
      createdAt: visualDate,
      score: props.score
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.scoreText}>{this.state.score}</Text>
          <Text style={styles.postText}>{this.state.content}</Text>
          <Text style={styles.createdAtText}>{this.state.createdAt}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: '#4d475c'
  },
  postText: {
    color: '#ffffff',
    fontSize: 15
  },
  scoreText: {
    color: '#5a9089'
  },
  createdAtText: {
    color: '#5a9089'
  },
  greenButton: {
    backgroundColor: '#00FF7F'
  },
  greenButtonText: {
    color: '#ffffff'
  }
})