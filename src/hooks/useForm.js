import { useState } from 'react';

const useForm = (initialValues) => {
    const [state, setState] = useState(initialValues);

    return [
        state,
        (e) => {
            if (typeof e.code === 'undefined') {
                console.log('here');
                setState({
                    ...state,
                    [e.target.name]: e.target.value,
                });
            } else {
                setState({ ...e });
            }
        },
    ];
};

export default useForm;
