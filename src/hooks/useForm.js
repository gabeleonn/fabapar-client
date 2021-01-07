import { useState } from 'react';

const useForm = (initialValues) => {
    const [state, setState] = useState(initialValues);

    return [
        state,
        (e) => {
            if (typeof e.target !== 'undefined') {
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
