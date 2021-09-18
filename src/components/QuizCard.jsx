import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import { PointContext } from '../App';
import Country from './Country';
import Retry from './Retry';

function QuizCard() {
    const [countries, setCountries] = useState([]);
    const [randomCountry, setRandomCountry] = useState([]);
    const [question, setQuestion] = useState({});
    const [retry, setRetry] = useState(true);
    const [answerBg,setAnswerBg] = useState({key: null, icon: null,  responseState: null});

    const [point, setPoint] = useContext(PointContext);

    useEffect(() => {
        getData();
    }, [])
    
    useEffect(() => {
        getRandomCountry();
    }, [countries])
    
    
    useEffect(() => {
        getQuestion()
    }, [randomCountry])

    useEffect(() => {

    }, [question])
    
    const getData = async () => {
        try {
            const response = await fetch("https://restcountries.eu/rest/v2/all");
            const data = await response.json();
            setCountries(data);
            getQuestion();

            console.log(point)
        } catch (error) {
            console.log(error);
        }
    };

    const getRandomNumber = (max) => Math.floor(Math.random() * max);

    const randomQuiz = ({country}) => {
        if (getRandomNumber(2)) {
            return <h4 className="sm:text-[1.35em] font-bold text-[#2F527B] mb-2">{country?.capital} is the capital of </h4>
            
        }
        return <div className="sm:text-[1.35em] font-bold text-[#2F527B] mb-2" ><img className=" w-24 shadow-md mb-4" src={country?.flag} alt="Flag"/>  Which country does this flag belongs to ? </div>
    }

    const getQuestion = () => {
        // console.log(randomCountry)
        let q = randomCountry[getRandomNumber(randomCountry.length)];
        setQuestion({ ...q, isCorrect: true , quiz: randomQuiz({...q}) });
    }
    
    const getRandomCountry = () => {

        let record = [];

        if (countries.length > 0) {
            for (let i = 65; i < 65 + 4; i++){
                let key = String.fromCharCode(i);
                let country = countries[getRandomNumber(countries.length)];
                record.push({ key, country , isCorrect: false });
            }
            setRandomCountry(record);
        }
        console.log(randomCountry)
    }

    const handleClick = () => {
        if (answerBg.key === question.key) {
            setAnswerBg({key: null, icon: null,  responseState: null})
            setPoint(point + 1);
            getData();
        } else {
            setAnswerBg({key: null, icon: null,  responseState: null})
            getData();
            setRetry(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center" style={styleSheet.bgImage}>
            <div className="min-w-full sm:min-h-[30em] sm:min-w-[26em] ">
                <h2 className="text-purple-100 text-2xl sm:text-4xl font-bold mb-4">Country Quiz</h2>

                {/* main card */}
                {retry ?

                    <div className="relative bg-purple-100 sm:px-8 sm:py-12 px-4 py-6 pb-6 rounded-3xl">
                    <img className="absolute w-32 -top-16 sm:w-auto sm:-top-20 right-0" src="/undraw_adventure_4hum 1.svg" alt="" />
                    {randomCountry.length > 0 ?
                        <>
                            {question.quiz}
                            <div>
                                {randomCountry.map(({ key, country }) =>
                                    <Country key={key} k={key} name={country.name} question={question} useAnswer={[answerBg, setAnswerBg]}
                                    />
                                )
                                }
                         
                            </div>
                        </> : <h2>Chargement</h2>
                    }

                    {answerBg.key &&
                        <div className="flex justify-end">
                            <button type="button" onClick={handleClick}
                                className="px-6 py-3 bg-[#F9A826] hover:opacity-90 duration-75 font-bold text-yellow-100 rounded-lg"
                            >Next</button>
                        </div>
                    }
                    </div>
                    :
                    <Retry setRetry={setRetry}/>
                 }
                
            </div>
        </div>
            
    );
}

export default memo(QuizCard);

const styleSheet = {
    bgImage: {
        backgroundImage: "url('/background.png')",
        backgroundSize: 'cover'
    },
};