import { useState } from 'react'


const AOTD = ({anecdotes,votes}) => {
  let max = Math.max(...votes)
  let index = votes.indexOf(max)
  
  return(
    <div>
      {anecdotes[index]}
    </div>
  )
}

const App = () => {


  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))



  const handleClick = () => setSelected(Math.floor(   (Math.random()*857)%6  )) 

  const handleVote = (selected) => {
    let newArr = [...votes];
    newArr[selected] += 1;
    setVotes(newArr);  
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br /><button onClick = {()=>handleVote(selected)}>vote</button>
      <button onClick = {handleClick}>next anecdote</button>

      <h1>Anecdote with most Votes</h1>
      <AOTD anecdotes = {anecdotes} votes = {votes}/>
    </div>

  )
}

export default App