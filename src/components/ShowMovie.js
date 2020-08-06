import React, { Component } from 'react'
import './ShowMovie.css'

class ShowMovie extends Component {
    render() {
        const movie = this.props.movie
        return (
            <div className="modal-body movie-modal-body scrollbar scrollbar-primary">
                <div className="row">
                    <div className="col">
                        <img className="movie-modal-img" src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="col movie-description">
                        <p className="card-text"><span>Imdb Rating:</span> {movie.imdbRating}</p>
                        <p className="card-text"><span>Production:</span> {movie.Production}</p>
                        <p className="card-text"><span>Genre:</span> {movie.Genre}</p>
                        <p className="card-text"><span>Awards:</span> {movie.Awards}</p>
                        <p className="card-text"><span>Director:</span> {movie.Director}</p>
                        <p className="card-text"><span>Actors:</span> {movie.Actors}</p>
                        <p className="card-text"><span>Plot:</span> {movie.Plot}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default ShowMovie
