import React, { useState } from 'react';
import './rt_style.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const RT: React.FC = () => {
    const [remedyName, setRemedyName] = useState('');
    const [dailyUnits, setDailyUnits] = useState('');
    const [pillQuantity, setPillQuantity] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setRemedyName('');
        setDailyUnits('');
        setPillQuantity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className='ft_input_text'>
                Nome do Remédio <input type="text" value={remedyName} onChange={(e) => setRemedyName(e.target.value)} placeholder="Digite o nome do remédio" />
            </label>
            <label className='ft_input_number'>
                Unidades diárias <input type="number" value={dailyUnits} onChange={(e) => setDailyUnits(e.target.value)} min="1" placeholder="Deve ser maior que 0" />
            </label>
            <label className='ft_input_number'>
                Quantidade de comprimidos na cartela <input type="number" value={pillQuantity} onChange={(e) => setPillQuantity(e.target.value)} min="1" placeholder="Deve ser maior que 0" />
            </label>
            <button type="submit">Adicionar <i className="bi bi-trash"></i> </button>
        </form>
    );
};

export default RT;
