import React, { Component } from 'react'
import axios from 'axios'
import ShowMovie from './ShowMovie'
import './SearchForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'

class SearchForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            year: '',
            type: '',
            movie: {},
            modalOpen: false,
            errorMsg: '',
            sortOrder: false,
            search: []
        }
    }

    resetForm = () => {
        let reset = window.confirm("Do you realy want to reset form?")
        if (reset) {
            this.setState({
                title: '',
                year: '',
                type: '',
                movie: {},
                modalOpen: false,
                errorMsg: '',
                sortOrder: false,
                search: []
            })
        }
    }
    submitHandler = e => {
        const { title, year, type } = this.state
        axios.get(`http://www.omdbapi.com/?apikey=2c0f72f6&s=${title}&y=${year}&type=${type}`)
            .then(response => {
                this.setState({
                    search: response.data.Search,
                    errorMsg: response.data.Search.length !== 0 ? '' : 'No movie was found with these parameters!'
                })
            })
            .catch(error => {
                console.log(error)
            })

        e.preventDefault()
    }

    changeTitleHandler = e => {
        this.setState({ title: e.target.value })
    }

    changeYearHandler = e => {
        this.setState({ year: e.target.value })
    }

    changeTypeHandler = e => {
        this.setState({ type: e.target.value })
    }

    // Sorting movies
    sortBy = (param, order) => {
        this.setState({
            search: this.sortMovies(param, order)
        })
    }

    sortMovies = (param, order) => {
        this.setState({ sortOrder: !order })
        return !order ?
            this.state.search.sort((a, b) => b[param] - a[param]) :
            this.state.search.sort((a, b) => a[param] - b[param])
    }

    clickOnMovie = id => {
        axios.get(`http://www.omdbapi.com/?apikey=2c0f72f6&i=${id}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    movie: response.data,
                    modalOpen: !this.state.modalOpen
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { title, year, type, movie, modalOpen, errorMsg, search } = this.state
        const modalStyle = {
            display: 'block'
        };
        modalOpen ? modalStyle.display = 'block' : modalStyle.display = 'none';
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-row justify-content-md-center" onSubmit={this.submitHandler}>
                            <div className="form-group col-md-4 mb-2">
                                <input className="form-control movie-input" type="text" id="title" name="title" value={title} onChange={this.changeTitleHandler}
                                    placeholder="Title" />
                            </div>
                            <div className="form-group col-md-2  mb-2">
                                <input className="form-control movie-input" type="text" name="year" value={year} onChange={this.changeYearHandler}
                                    placeholder="Year"
                                />
                            </div>
                            <div className="form-group col-md-2  mb-2">
                                <select className="form-control movie-input" value={type} onChange={this.changeTypeHandler}>
                                    <option value="type" hidden>Type</option>
                                    <option value="movie">Movie</option>
                                    <option value="series">Series</option>
                                    <option value="game">Game</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <button className="btn btn-success mb-2 mr-2 movie-sort-btn" type="button" onClick={() => this.sortBy('Year', this.state.sortOrder)}>
                                    Sort by Year <FontAwesomeIcon icon={!this.state.sortOrder ? faLongArrowAltUp : faLongArrowAltDown} />
                                </button>
                                <button className="btn btn-primary mb-2 mr-2 movie-search-btn" type="submit">Search</button>
                                <button className="btn btn-danger mb-2 movie-reset-btn" type="button" onClick={this.resetForm}>Reset</button>
                            </div>
                        </form>
                        <div className="row">
                            {
                                search !== undefined && search.length ?
                                    search.map(item =>
                                        <div className="col-md-3 mb-2" key={item.imdbID} onClick={() => this.clickOnMovie(item.imdbID)}>
                                            <div className="card movie-card" >
                                                <img className="card-img-top movie-img" src={item.Poster !== "N/A" ? item.Poster : null} alt={item.title} />
                                                <div className="card-body">
                                                    <h5 className="card-title text-center">{item.Title}</h5>
                                                    <p className="card-text"><span>Type:</span> {item.Type}</p>
                                                    <p className="card-text"><span>Realise Date:</span> {item.Year}. year</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div>{errorMsg}</div>
                            }
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <div className="modal" tabIndex="-1" role="dialog" style={modalStyle}>
                    <div className="modal-dialog movie-modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header movie-modal-header">
                                <div>
                                    <h5 className="modal-title">{movie.Title}</h5>
                                    <small className="movie-date-sm"><span>Realised:</span> {movie.Released}</small>
                                </div>
                                <button type="button" className="close movie-modal-close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {
                                modalOpen ? <ShowMovie movie={movie} modalOpen={modalOpen} /> : null
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop" style={modalStyle} onClick={this.closeModal}></div>
            </React.Fragment>
        )
    }
}

export default SearchForm
