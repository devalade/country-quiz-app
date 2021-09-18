import React, { createContext, useState } from 'react';
import QuizCard from "./components/QuizCard";

export const PointContext = createContext(0);

function App() {
  const [point, setPoint] = useState(0);
  // console.log(point);
  return (
    <PointContext.Provider value={[point, setPoint]}>
      <QuizCard />
    </PointContext.Provider>
  );
}

export default App;
