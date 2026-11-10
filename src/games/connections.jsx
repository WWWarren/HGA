import { useEffect, useState } from 'react';

import data from '../data/connections.json';

function Connections() {
    const [success, SetSuccess] = useState([]);
    const [wrong, SetWrongGuess] = useState(false);
    const [guess, setGuess] = useState([]);

    function initConnections() {
        let values = []
        data.forEach(d => {
            d['values'].forEach(v => {
                values.push(v);
            })
        })

        return values.map((v, i) => {
            // Check connection is active
            const isActive = (guess.length > 0 && guess.filter(g => g === v));
            const isSuccess = (success.length > 0 && success.filter(s => s === v));

            return (
            <div 
                key={i} 
                onClick={(e) => setConnection(v, e)}
                className={`
                    ${isActive.length > 0 ? 'active' : ''}
                    ${isSuccess.length > 0 ? 'success' : ''}
                `}
            >
                {v}
            </div>
        )
        });
    }

    function setConnection(connection) {
        // Make sure no guesses over 4
        if (guess.length < 4) { setGuess([...guess, connection]) };
    }


    useEffect(() => {
        if (guess.length === 4) {
            function checkGuesses() {
                const check = data.filter(d => {
                    const a = [...d.values].sort().toString();
                    const b = [...guess].sort().toString();

                    return a === b
                });

                // Set correct or wrong answers
                check.length > 0 ? SetSuccess((currentSuccess) => [...currentSuccess, guess]) : SetWrongGuess(current => !current);

                // Reset guesses
                setGuess([]);
            }

            checkGuesses();
        }
    }, [guess]);

    console.log(success);
    
    return (
        <>
            {guess.map((g, i) => {
                return (
                    <div key={i} className="guess">
                        {g}
                    </div>
                )
            })}
            <hr />
            {initConnections()}
        </>
    )
}

export default Connections;