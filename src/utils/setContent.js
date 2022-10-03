import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (process, Component, data, style = null) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner style={style} />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage style={style} />;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;