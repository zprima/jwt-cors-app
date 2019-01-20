// import React from 'react';

// function underAuth(WrappedComponent) {
//   return class extends React.Component {
//     constructor(props) {
//       super(props)
//     }

//     componentDidMount = () => {
//       console.log("under auth loded")
//     }

//     render() {
//       return <WrappedComponent {...this.props} />
//     }
//   }
// }

// Nextjs does not support under HOC
// underAuth.getInitialProps = async ctx => {
//   console.log("gip")
//   return {}
// }

// export default underAuth;