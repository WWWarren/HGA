import { useEffect, useState } from 'react';

import data from '../data/connections.json';

function Connections() {
    const [success, SetSuccess] = useState([]);
    const [wrong, SetWrongGuess] = useState({});
    const [guess, setGuess] = useState([]);

    function initConnections() {
        let values = []
        data.forEach(d => {
            d['values'].forEach(v => {
                values.push(v);
            })
        })

        return values.map((v, i) => {
            // Check connection status
            const isActive = (guess.length > 0 && guess.filter(g => g === v));
            const isSuccess = (success.length > 0 && success.filter(s => {
                return s.values.filter(vv => vv === v).length > 0;
            }));
            const isWrong = (wrong.status === true && wrong.guesses.filter(w => w === v));

            return (
            <div 
                key={i} 
                onClick={(e) => setConnection(v, e)}
                className={`block px-4 h-20 border rounded cursor-pointer bg-olive-200 text-slate-900 font-semibold hover:bg-gray-100 hover:shadow-md transition flex items-center justify-center ${isActive.length > 0 ? 'bg-amber-400!' : ''} ${isSuccess.length > 0 ? 'hidden' : ''}${isWrong.length > 0 ? 'bg-red-400' : ''}`}
            >
                {v}
            </div>
        )
        });
    }

    function setConnection(connection) {
        // Make sure no guesses over 4
        if (guess.length < 4) { 
            SetWrongGuess({})
            setGuess([...guess, connection]) 
        };
    }

    function renderSuccess() {
        return (
            <div className="success">
                {
                    success.map((s, i) => {
                        const connections = s.values.map((v) => (
                            <div key={v} className="">{v}</div>
                        ))
                        return (
                            <div key={i} className="bg-green-500 text-slate-900 p-4 rounded mb-4">
                                <h3 className="title w-full font-bold text-2xl">{s.name}</h3>
                                <div className="flex flex-wrap items-center justify-center gap-4 font-semibold">
                                    {connections}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function renderVictory() {
        return (
            <div className="victory">
                <h2>Congratulations!</h2>
                <p>You have found all the connections!</p>
                <p>Provide a photo from the following location to redeem your ticket - </p>
            </div> 
        )
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
                check.length > 0 ? SetSuccess((currentSuccess) => [...currentSuccess, check[0]]) : SetWrongGuess(() => ({status: true, guesses: guess}));

                // Reset guesses
                setGuess([]);
            }

            checkGuesses();
        }
    }, [guess]);

    return (
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2 mt-4">Connections</h2>
            <p className="mb-4">Select 4 items that you think are connected.</p>
            <>
            {
                success.length > 0 && (
                    renderSuccess()
                )
            }
            </>
            <hr />
            <div className="grid grid-cols-8 gap-4 mt-4 mb-4">
               {initConnections()}
            </div>
            <>
            {
                success.length === data.length && (
                    renderVictory()
                )
            }
            </>
        </div>
    )
}

export default Connections;