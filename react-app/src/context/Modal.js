
import { createContext, useContext, useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom'
import './Modal.css';

export const ModalContext = createContext()

export default function ModalProvider({ children }){
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(()=> {
        setValue(modalRef.current)
    }, [])

    return (
        <>
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
        <div ref={modalRef} />
        </>
    )
}

export function Modal({onClose, children, size}) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={onClose} />
            <div id={size? `modal-content-${size}` : 'modal-content'}>
                {children}
            </div>
        </div>,
        modalNode
    )
}
