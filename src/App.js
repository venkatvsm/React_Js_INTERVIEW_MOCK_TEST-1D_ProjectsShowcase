import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from './components/Header'
import ProductDetailsList from './components/ProductDetailsList'
import './App.css'

// This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
// Replace your code here

class App extends Component {
  state = {
    categoriesListEl: categoriesList[0].id,
    productList: [],
    apiStatus: 'LOADING',
  }

  componentDidMount() {
    this.renderApiCalls()
  }

  renderApiCalls = async () => {
    this.setState({apiStatus: 'LOADING'})
    const {categoriesListEl} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${categoriesListEl}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.projects.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      console.log(updatedList)
      this.setState({apiStatus: 'SUCCESS', productList: updatedList})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onChangeCategoriesList = event => {
    this.setState({categoriesListEl: event.target.value}, this.renderApiCalls)
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  )

  renderSuccessView = () => {
    const {productList} = this.state
    return (
      <ul className="ListContainer">
        {productList.map(eachItem => (
          <ProductDetailsList productList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure_image"
      />
      <h1 className="failure_Heading">Oops! Something Went Wrong</h1>
      <p className="failure_para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure_Btn"
        type="button"
        onClick={this.renderApiCalls}
      >
        Retry
      </button>
    </div>
  )

  renderComponentsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    const {categoriesListEl} = this.state
    return (
      <div className="bgContainer">
        <Header />
        <div className="cardContainer">
          <select
            onChange={this.onChangeCategoriesList}
            className="optionsContainer"
            value={categoriesListEl}
          >
            {categoriesList.map(eachItem => (
              <option className="option" value={eachItem.id} key={eachItem.id}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          {this.renderComponentsView()}
        </div>
      </div>
    )
  }
}

export default App
