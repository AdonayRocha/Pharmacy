import React, { useState } from 'react';
import './rt_list_style.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 

interface Remedy {
    name: string;
    dailyUnits: number;
    pillQuantity: number;
}

const RTList: React.FC = () => {
    const [remedyName, setRemedyName] = useState('');
    const [dailyUnits, setDailyUnits] = useState('');
    const [pillQuantity, setPillQuantity] = useState('');
    const [remedies, setRemedies] = useState<Remedy[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (remedyName && dailyUnits && pillQuantity) {
            const newRemedy = {
                name: remedyName,
                dailyUnits: parseInt(dailyUnits),
                pillQuantity: parseInt(pillQuantity)
            };
            setRemedies([...remedies, newRemedy]);
            setRemedyName('');
            setDailyUnits('');
            setPillQuantity('');
        } else {
            alert('Por favor, preencha todos os campos antes de adicionar.');
        }
    };

    const handleDelete = (index: number) => {
        setRemedies(remedies.filter((_, i) => i !== index));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className='rt-input-text'>
                    Nome do Remédio <input type="text" value={remedyName} onChange={(e) => setRemedyName(e.target.value)} placeholder="Digite o nome do remédio" />
                </label>
                <label className='rt-input-number'>
                    Unidades diárias <input type="number" value={dailyUnits} onChange={(e) => setDailyUnits(e.target.value)} min="1" placeholder="Deve ser maior que 0" />
                </label>
                <label className='rt-input-number'>
                    Quantidade de comprimidos na cartela <input type="number" value={pillQuantity} onChange={(e) => setPillQuantity(e.target.value)} min="1" placeholder="Deve ser maior que 0" />
                </label>
                <button type="submit">Adicionar <i className="bi bi-capsule"></i></button>
            </form>
            <ul className='rt-list-ul'>
                {remedies.map((remedy, index) => (
                    <li className='rt-list-li' key={index}>
                        {remedy.name} - {remedy.dailyUnits} Unidades diárias - {remedy.pillQuantity} Comprimidos na cartela
                        <button className='rt-remove-btn' onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default RTList;
