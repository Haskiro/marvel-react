import './SingleCharLayout.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleCharLayout = ({ data }) => {
    const { thumbnail, title, description } = data;

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFit': 'unset' }
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} char detail page`}
                />
                <title>{title}</title>
            </Helmet>
            <div className="single-char">
                <img src={thumbnail} alt={title} className="single-char__img" style={imgStyle} />
                <div className="single-char__info">
                    <h2 className="single-char__name">{title}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
                <Link to='/' className="single-char__back">Back to all</Link>
            </div >
        </>
    )
}

export default SingleCharLayout;