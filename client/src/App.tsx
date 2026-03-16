import './App.css';

function App () {
  
  let name: string = "Mark";
  let age: number = 20;

  let score1: number = 85;
  let score2: number = 90;
  let totalScore: number = score1 +score2;

  let average: number = totalScore/2;

  // 

  return (
    <> {/* FRAGMENT */}
        <h1 className='text-5xl'>Student Information</h1><br />

        <div className='flex justify-between flex-col'>
          <div className='flex flex col justify-between'>
            <div className='flex flex-col justify-center'>
              <p>Name: {name} </p>
              <p>Age: {age} </p>
            </div>
            <div className='flex flex-col justify-center'>
              <h2>Scores</h2>
              <p>Score 1: {score1} </p>
              <p>Score 2: {score2} </p>
            </div>
          </div>

          <h3>Total Score: {totalScore} </h3>
          <h3>Average Score: {average} </h3>
        </div>
    </>
  )
}

export default App