import React, { memo, useState } from 'react';

const close = <button className="p-1 transition-colors duration-200 transform rounded-md focus:outline-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
</svg>

</button>;

const valid = <button className="p-1 transition-colors duration-100 transform rounded-md  focus:outline-none">
    <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"></path>
    </svg>
</button>;

const RESPONSE_STATE = {
    sucess: "w-full my-6 border-2  rounded-2xl cursor-pointer text-blue-500   bg-green-500  text-white",
    error: "w-full my-6 border-2  rounded-2xl cursor-pointer text-blue-500   bg-red-500  text-white"
}

function Country({ name, k, question , useAnswer}) {
    const [answerBg,setAnswerBg] = useAnswer;
    
    const handleClick = () => {
        if (!answerBg.key) {
            
            if (question.key === k) {
                setAnswerBg({key: k, icon: valid, responseState: RESPONSE_STATE["sucess"]})
            } else {
                setAnswerBg({key: k, icon: close, responseState: RESPONSE_STATE["error"]})
            }
        }
        console.log(answerBg);
    }
    return (
        <div onClick={handleClick} className={(answerBg.key !== k ? ( answerBg.key !== null &&  question.key === k && RESPONSE_STATE['sucess']) || `w-full my-6  border-2  rounded-2xl cursor-pointer text-blue-500  hover:border-[#F9A826] border-blue-500 hover:text-white  hover:bg-[#F9A826]` : answerBg.responseState)  }>
            <div className="flex items-center justify-between px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <h2 className="text-2xl">{k}</h2>
                    <p className="mx-4">{name}</p>
                </div>
                { answerBg.key === question.key ?  answerBg.key == k && answerBg?.icon : ( answerBg.key !== null && question.key === k && valid) || answerBg.key == k && answerBg?.icon}
            </div>
        </div>
    );
}

export default Country;
