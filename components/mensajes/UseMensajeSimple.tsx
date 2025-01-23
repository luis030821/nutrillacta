import { useState } from 'react';
import ReactDOM from 'react-dom';
import MensajeSimple from './MensajeSimple';

const useMensajeSimple = () => {
  const [contador, setContador] = useState(0);

  const mostrarMensaje = (texto: string, tiempo: number) => {
    const id = `mensaje-${contador}`;
    setContador(prevContador => prevContador + 1);

    const onClose = () => {
      const element = document.getElementById(id);
      if (element) {
        ReactDOM.unmountComponentAtNode(element);
        element.remove();
      }
    };

    ReactDOM.render(
      <MensajeSimple id={id} texto={texto} tiempo={tiempo} onClose={onClose} />,
      document.body.appendChild(document.createElement('div'))
    );
  };

  return mostrarMensaje;
};

export default useMensajeSimple;
