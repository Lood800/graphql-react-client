import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (
      <div className='link-container'>
          <div>
            {this.props.link.id}
          </div>
          <a href={this.props.link.id} target='_blank' rel='noopener noreferrer'>
            {this.props.link.id}
          </a>
      </div>
    )
  } 
}

export default Link