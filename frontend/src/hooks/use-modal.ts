import {useState} from "react";

const useModal = <T>(defaultState: boolean) => {
    const [params, setParams] = useState<T>();
    const [isVisible, setIsVisible] = useState<boolean>(defaultState);

    const show = (params: T) => {
        setParams(params);
        setIsVisible(true);
    }

    const hide = () => {
        setIsVisible(false);
    }

    return {
        isVisible,
        show,
        hide,
        params,
    };
};

export default useModal;
