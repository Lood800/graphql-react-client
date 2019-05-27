import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const LINKS = gql`
  query {
    pos {
      allPrintJobs {
        id,
        printTerminalId
      }
    }
  }
`
// const NEW_PRINT_JOBS = gql`
//   subscription {
//     newPrintJob (printTerminalId: "ee963023-5675-4f83-9858-d963701c68b2") {
//       id,
//       printTerminalId
//     }
//   }
// `
const NEW_PRINT_JOBS = gql`
  subscription {
    newPrintJob {
      id,
      printTerminalId
    }
  }
`

class Links extends Component {
  _subscribeToNewLinks = subscribeToMore => {
    subscribeToMore({
      document: NEW_PRINT_JOBS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newLink = subscriptionData.data.newPrintJob
        debugger;
        return Object.assign({}, prev, {
          links: [newLink, ...prev.pos.allPrintJobs],
          __typename: prev.pos.__typename
        })
      }
    })
  }

  render() {
    return (
      <Query query={LINKS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLinks(subscribeToMore)
          debugger;
          const linksToRender = data.pos.allPrintJobs

          return (
            <div>
              <h3>Neat Links</h3>
              <div>
                {linksToRender.map(link => <Link key={link.id} link={link} />)}
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Links
