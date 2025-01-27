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
    const [travelDays, setTravelDays] = useState<number | null>(null);
    const [remedies, setRemedies] = useState<Remedy[]>([]);
    const [travelCalculations, setTravelCalculations] = useState<string[]>([]);

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
        const newRemedies = remedies.filter((_, i) => i !== index);
        setRemedies(newRemedies);

        // Atualiza os cálculos de viagem após a exclusão
        const calculations = newRemedies.map(remedy => {
            const totalUnits = (remedy.dailyUnits * (travelDays ?? 0)) + remedy.dailyUnits; // Acrescentando um dia de reserva
            const totalCartelas = Math.ceil(totalUnits / remedy.pillQuantity);
            return `${remedy.name}: Total de unidades - ${totalUnits}, Total de cartelas - ${totalCartelas}`;
        });
        setTravelCalculations(calculations);
    };

    const handleTravelCalculation = () => {
        if (travelDays !== null && travelDays > 0 && remedies.length > 0) {
            const calculations = remedies.map(remedy => {
                const totalUnits = (remedy.dailyUnits * travelDays) + remedy.dailyUnits; // Acrescentando um dia de reserva
                const totalCartelas = Math.ceil(totalUnits / remedy.pillQuantity);
                return `${remedy.name}: Total de unidades - ${totalUnits}, Total de cartelas - ${totalCartelas}`;
            });
            setTravelCalculations(calculations);
        } else {
            alert('Por favor, insira o número de dias de viagem e adicione pelo menos um remédio.');
        }
    };

    return (
        <div className="flex-container">
            <form onSubmit={handleSubmit} className="flex-item">
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
                <label className='rt-input-number'>
                    Dias de viagem <input type="number" value={travelDays ?? ''} onChange={(e) => setTravelDays(Number(e.target.value))} min="1" placeholder="Digite o número de dias de viagem" />
                </label>
                <button type="button" onClick={handleTravelCalculation}>Calcular Dias de Viagem</button>
            </form>
            <ul className="rt-list-ul flex-item">
                {remedies.map((remedy, index) => (
                    <li className="rt-list-li" key={index}>
                        {remedy.name} - {remedy.dailyUnits} unidades diárias - {remedy.pillQuantity} comprimidos na cartela
                        <button className="rt-remove-btn" onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></button>
                    </li>
                ))}
            </ul>
            <ul className="rt-list-ul flex-item">
                {travelCalculations.map((calculation, index) => (
                    <li className="rt-list-li" key={index}>
                        {calculation}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RTList;
