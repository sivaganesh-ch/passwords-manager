import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

document.title = 'SG Passwords Manager'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    showPasswords: false,
    passwordsList: [],
    search: '',
  }

  onChangeSearchValue = event => {
    this.setState({search: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        passwordsList: [
          ...prevState.passwordsList,
          {website, username, password},
        ],
      }))
    }
  }

  deletePassword = index => {
    this.setState(prevState => {
      const {passwordsList} = prevState
      const updatedPasswordsList = passwordsList.filter(
        (each, eachIndex) => eachIndex !== index,
      )
      return {passwordsList: updatedPasswordsList}
    })
  }

  render() {
    const {passwordsList, showPasswords, search} = this.state
    const passwordsCount = passwordsList.length
    const filteredPasswordsList = passwordsList.filter(eachPassword => {
      const {website} = eachPassword
      return (
        search === '' ||
        (website.toLowerCase() === search.toLowerCase() &&
          website.toLowerCase().includes(search.toLowerCase()))
      )
    })
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="passwords-manager-container">
            <img
              className="app-logo"
              alt="app logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            />
          </div>
          <div className="add-passwords-container">
            <img
              className="password-manager-sm-img"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <form
              className="add-passwords-form-container"
              onSubmit={this.onClickAdd}
            >
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  className="input-icon"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  type="text"
                  className="user-input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-icon"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  type="text"
                  className="user-input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-icon"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  className="user-input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="add-password-btn">
                Add
              </button>
            </form>
            <img
              className="password-manager-lg-img"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
          <div className="added-passwords-container">
            <div className="added-passwords-container-navbar">
              <div className="navbar-heading-container">
                <h1 className="navbar-heading">Your Passwords</h1>
                <p className="passwords-count">{passwordsCount}</p>
              </div>
              <div className="input-container">
                <img
                  className="input-icon"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                />
                <input
                  type="search"
                  className="user-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchValue}
                  value={search}
                />
              </div>
            </div>
            <div className="added-passwords-list-container">
              <div className="user-checkbox-container">
                <input
                  type="checkbox"
                  id="checkbox"
                  onClick={() => {
                    this.setState(prevState => ({
                      showPasswords: !prevState.showPasswords,
                    }))
                  }}
                  value={this.showPasswords}
                />
                <label htmlFor="checkbox">Show Passwords</label>
              </div>
              {filteredPasswordsList.length !== 0 ? (
                <ul className="added-passwords-list">
                  {passwordsList.map((eachPassword, index) => {
                    const {website, username, password} = eachPassword
                    return (
                      <li className="added-password-item" key={uuidv4()}>
                        <h1 className="website-logo">{website[0]}</h1>
                        <div className="password-content">
                          <p>{website}</p>
                          <p>{username}</p>
                          {showPasswords ? (
                            <p>{password}</p>
                          ) : (
                            <img
                              className="delete-icon"
                              alt="stars"
                              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            />
                          )}
                        </div>
                        <button
                          type="button"
                          data-testid="delete"
                          className="delete-password-btn"
                          onClick={() => {
                            this.deletePassword(index)
                          }}
                        >
                          <img
                            className="delete-icon"
                            alt="delete"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="no-products-container">
                  <img
                    className="no-passwords"
                    alt="no passwords"
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  />
                  <p className="no-password-text">No Passwords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
