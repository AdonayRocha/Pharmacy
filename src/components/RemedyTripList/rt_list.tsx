import React, { useState } from 'react';
import './rt_list_style.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

interface Remedy {
    name: string;
    dailyUnits: number;
    pillQuantity: number;
}

interface CalculatedRemedy extends Remedy {
    totalUnits: number;
    totalCartelas: number;
}

const RTList: React.FC = () => {
    const [remedyName, setRemedyName] = useState('');
    const [dailyUnits, setDailyUnits] = useState('');
    const [pillQuantity, setPillQuantity] = useState('');
    const [travelDays, setTravelDays] = useState<number | null>(null);
    const [remedies, setRemedies] = useState<Remedy[]>([]);
    const [travelCalculations, setTravelCalculations] = useState<CalculatedRemedy[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!remedyName || !dailyUnits || !pillQuantity) {
            alert('Por favor, preencha todos os campos antes de adicionar.');
            return;
        }
        const newRemedy = {
            name: remedyName.slice(0, 50),
            dailyUnits: parseInt(dailyUnits),
            pillQuantity: parseInt(pillQuantity),
        };
        setRemedies([...remedies, newRemedy]);
        setRemedyName('');
        setDailyUnits('');
        setPillQuantity('');
    };

    const handleDelete = (index: number) => {
        const newRemedies = remedies.filter((_, i) => i !== index);
        setRemedies(newRemedies);
        
        // Verifica se existe dia de viagem
        if (travelDays !== null && travelDays > 0) {
            updateTravelCalculations(newRemedies);
        }
    };

    const handleTravelCalculation = () => {
        if (travelDays !== null && travelDays > 0 && remedies.length > 0) {
            updateTravelCalculations(remedies);
        } else {
            alert('Por favor, insira o número de dias de viagem e adicione pelo menos um remédio.');
        }
    };

    const updateTravelCalculations = (remedyList: Remedy[]) => {
        const calculations = remedyList.map(remedy => {
            const totalUnits = remedy.dailyUnits * (travelDays ?? 0 + 1);
            const totalCartelas = Math.ceil(totalUnits / remedy.pillQuantity);
            return {
                ...remedy,
                totalUnits,
                totalCartelas
            };
        });
        setTravelCalculations(calculations);
    };

    return (
        <div className="flex-container">
            <form onSubmit={handleSubmit} className="flex-item form">
                <h2>Cadastro do Remédio</h2>
                <FormInput label="Nome do Remédio" value={remedyName} onChange={setRemedyName} maxLength={50} />
                <FormInput label="Unidades diárias" value={dailyUnits} onChange={setDailyUnits} type="number" maxLength={7} min="1" />
                <FormInput label="Comprimidos na cartela" value={pillQuantity} onChange={setPillQuantity} type="number" maxLength={7} min="1" />
                <button type="submit">Adicionar <i className="bi bi-capsule"></i></button>
                
                <FormInput label="Dias de viagem" value={travelDays?.toString() ?? ''} onChange={(value) => setTravelDays(Number(value))} type="number" maxLength={3} min="1" />
                <button type="button" onClick={handleTravelCalculation}>Calcular Viagem <i className="bi bi-luggage"></i></button>
            </form>
            <div className="flex-item list-container">
                <RemedyList remedies={remedies} onDelete={handleDelete} />
                <CalculationList calculations={travelCalculations} />
            </div>
        </div>
    );
};

const FormInput: React.FC<{label: string, value: string, onChange: (value: string) => void, type?: string, maxLength?: number, min?: string}> = ({ label, value, onChange, type = "text", maxLength, min }) => (
    <label className={`rt-input-${type}`}>
        {label}
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            placeholder={`Digite ${label.toLowerCase()}`}
            maxLength={maxLength}
            min={min}
        />
    </label>
);

const RemedyList: React.FC<{ remedies: Remedy[], onDelete: (index: number) => void }> = ({ remedies, onDelete }) => (
    <div className="list-column">
        <h3>Remédios Cadastrados</h3>
        <ul className="rt-list-ul">
            {remedies.map((remedy, index) => (
                <li className="rt-list-li" key={index}>
                    Nome: {remedy.name}<br />
                    Unidades diárias: {remedy.dailyUnits}<br />
                    Quantidade na cartela: {remedy.pillQuantity}<br />
                    <button className="rt-remove-btn" onClick={() => onDelete(index)}><i className="bi bi-trash"></i></button>
                </li>
            ))}
        </ul>
    </div>
);

const CalculationList: React.FC<{ calculations: CalculatedRemedy[] }> = ({ calculations }) => (
    <div className="list-column">
        <h3>Remédios para Viagem</h3>
        <ul className="rt-list-ul">
            {calculations.map((calculation, index) => (
                <li className="rt-list-li" key={index}>
                    Nome: {calculation.name}<br />
                    Unidades Diarias Total: {calculation.totalUnits}<br />
                    Total de cartelas: {calculation.totalCartelas}
                </li>
            ))}
        </ul>
    </div>
);

export default RTList;
