import { useState } from 'react'


const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>

const StatisticsLine =({text,count,modifier}) => <p>{text} {count} {modifier}</p>

const Statistics = ({good,neutral,bad,total}) => {

  if (!total) return <p>No feedback given</p>

  return(
  <div>
      <StatisticsLine text = "good" count = {good}/>
      <StatisticsLine text = "neutral" count = {neutral}/>
      <StatisticsLine text = "bad" count = {bad}/>
      <StatisticsLine text = "all" count = {total}/>
      <StatisticsLine text = "average" count = {(good*1 + bad*-1)/total}/>
      <StatisticsLine text = "positive" count = {good/total * 100} modifier = "%"/>
  </div>
  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const total = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick = {handleGoodClick} text = "good" />
        <Button handleClick = {handleNeutralClick} text = "neutral"/>
        <Button handleClick = {handleBadClick} text = "bad"/>
      </div>
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral} total = {total}/>
    </div>
  )
}

export default App;
