const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  const adder = item => {
    sum += item.likes
  }
  blogs.forEach(adder)
  return sum
}

const favourites = blogs => {
 const highest = blogs.reduce((prev,current) => {
      if (current.likes > prev.likes)
        return current
      else
        return previous
 })
 return highest
  
}

  module.exports = {
    dummy,
    totalLikes,
    favourites,
}