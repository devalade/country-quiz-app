import React, { useContext } from 'react';
import { PointContext } from '../App';

function Retry({ setRetry }) {
    
    const [point, setPoint] = useContext(PointContext);

    const handleClick = () => {
        setPoint(0);
        setRetry(prev => !prev);
    }
    return (
        <div className="w-full flex flex-col items-center justify-between bg-purple-100 px-8 py-14 pb-0 rounded-3xl">
            <img className="mb-12" src="/undraw_winners_ao2o 2.svg" alt="Winner SVG" />
            <div className="mb-12">
                <h2 className="text-4xl text-center font-semibold text-blue-900">Results</h2>
                <p className="text-blue-900">You got <span className="text-3xl font-semibold text-green-500">{point}</span> correct answers</p>
            </div>
            <button onClick={handleClick} className="border-2 border-blue-900 rounded-lg px-10 py-3 mb-4 text-blue-900">Try again</button>
        </div>
    );
}

export default Retry;
