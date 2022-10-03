import './CharSearch.scss';
import { Form, Field, Formik, ErrorMessage as FormikErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import * as Yup from 'yup';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const setContent = (process, Component, Results, char) => {
    switch (process) {
        case 'waiting':
            return <Component loading={false} />;
        case 'loading':
            return <Component loading={true} />;
        case 'confirmed':
            return (
                <>
                    <Component loading={false} />
                    <Results char={char} />
                </>
            );
        case 'error':
            <>
                <Component loading='false' />
                <div className="char__search-critical-error"><ErrorMessage /></div>
            </>
            return;
        default:
            throw new Error('Unexpected process state');
    }
}


const CharSearch = () => {
    const { getCharacterByName, process, setProcess, clearError } = useMarvelService();
    const [char, setChar] = useState([])

    const updateChar = (charName) => {
        clearError();
        getCharacterByName(charName)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }
    console.log(process)

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const Results = ({ char }) => {
        return (
            (char.length > 0) ?
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                    <Link to={`/char/${char[0].id}`} className="button button__secondary">
                        <div className="inner">To page</div>
                    </Link>
                </div> :
                <div className="char__search-error">
                    The character was not found. Check the name and try again
                </div>
        )
    }

    const FormComponent = ({ loading }) => {
        return (
            <Formik
                component={null}
                initialValues={{ charName: '' }}
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                        .required('The field is required')
                })}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name='charName'
                            type='text'
                            placeholder="Enter name" />
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>

        )
    }

    return (
        <div className="char__search-form">
            {setContent(process, FormComponent, Results, char)}
        </div>
    )
}

export default CharSearch;