import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Shared/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../Home/Home'
import ShowProduct from '../ShowProduct/ShowProduct'
import IndexProducts from '../IndexProducts/IndexProducts'
import ProductCreate from '../ProductCreate/ProductCreate'
import ProductEdit from '../ProductEdit/ProductEdit'
import MyStore from '../MyStore/MyStore'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/products' component= {IndexProducts} />
          <AuthenticatedRoute user={user} exact path="/products/:id" render={({ match }) => (
            < ShowProduct msgAlert={this.msgAlert} user={user} match={match}/>
          )}/>

          <AuthenticatedRoute user={user} exact path="/my-store" render={({ match }) => (
            < MyStore msgAlert={this.msgAlert} user={user} match={match}/>
          )}/>

          <AuthenticatedRoute user={user} exact path="/create-product" render={() => (
            < ProductCreate msgAlert={this.msgAlert} user={user}/>
          )}/>

          <AuthenticatedRoute user={user} exact path="/products/:id/edit" render={({ match }) => (
            < ProductEdit msgAlert={this.msgAlert} user={user} match={match}/>
          )}/>
          <Route exact path='/' component= {Home} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
