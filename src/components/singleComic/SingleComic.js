import './singleComic.scss';
import { Link } from 'react-router-dom';

const SingleComic = ({ data }) => {
    const { thumbnail, title, description, pageCount, price } = data;

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFit': 'unset' }
    }

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="comics.title" className="single-comic__img" style={imgStyle} />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div >
    )
}

export default SingleComic;