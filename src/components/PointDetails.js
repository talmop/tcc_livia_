function PointDetails({ point }) {
    return (
        <div>
            <h2>{point.name}</h2>
            <p>Avaliações: {point.rating}</p>
            <button onClick={() => { /* função para iniciar navegação */ }}>ROTA</button>
            <button onClick={() => { /* função para abrir tela de avaliação */ }}>Avaliar</button>
        </div>
    );
}

export default PointDetails;
