
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

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
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={this.onUpvote.bind(this)}
        >
            <Text style={styles.greenButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redButton}
            onPress={this.onDownvote.bind(this)}
        >
            <Text style={styles.redButtonText}>-</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

  async onUpvote () {
    await fetch(this.state.url + '/vote/' + this.state.id + '/upvote', {
      method: 'POST'
    })
  }

  async onDownvote () {
    await fetch(this.state.url + '/vote/' + this.state.id + '/downvote', {
      method: 'POST'
    })
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  greenButton: {
    flex: 1,
    backgroundColor: '#00FF7F'
  },
  greenButtonText: {
    color: '#ffffff',
        textAlign: 'center'
  },
  redButton: {
    flex: 1,
    backgroundColor: '#ff2e2e'
  },
  redButtonText: {
    color: '#ffffff',
        textAlign: 'center'
  }
})
