import { useEffect, useState } from "react";

function Dia() {
  let dayOfWeek = [
    'Domingo', 
    'Segunda-feira', 
    'Terça-feira', 
    'Quarta-feira', 
    'Quinta-feira', 
    'Sexta-feira', 
    'Sábado'
  ];

  let months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  let date = new Date();
  let day = date.getDay();

  let numberDay = date.getDate();
  let numberMonth = date.getMonth();
  let numberYear = date.getFullYear();

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    function atualizarHora() {
      const agora = new Date();

      setHours(agora.getHours());

      let minuteNumber = agora.getMinutes();
      if (minuteNumber < 10) {
        minuteNumber = `0${minuteNumber}`;
      }
      setMinutes(minuteNumber);
    }

    atualizarHora();
    const id = setInterval(atualizarHora, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <p>{dayOfWeek[day]}, {numberDay} de {months[numberMonth]} de {numberYear}</p>
      <p>{hours}:{minutes}</p>
    </>
  )
};

export default Dia;