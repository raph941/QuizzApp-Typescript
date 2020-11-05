
// this helps to give us a random array, not perfect solution tho
export const shuffleArray = (array: any[]) => 
  [...array].sort(() => Math.random() - 0.5)