import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';

interface MensajeSimpleProps {
  id: string;
  tiempo: number;
  texto: string;
  onClose: () => void;
}

const MensajeSimple: React.FC<MensajeSimpleProps> = ({ id, tiempo, texto, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, tiempo);

    return () => {
      clearTimeout(timer);
      const element = document.getElementById(id);
      if (element) {
        ReactDOM.unmountComponentAtNode(element);
        element.remove();
      }
    };
  }, [id, tiempo, onClose]);

  return createPortal(
    <div id={id} className="fixed min-w-[260px]  text-center bottom-[140px] z-[9999] left-1/2 transform -translate-x-1/2 bg-gray-900 border-2 border-white text-white py-2 px-4 rounded-[7px] ">
      {texto}
    </div>,
    document.body
  );
}

export default MensajeSimple;
