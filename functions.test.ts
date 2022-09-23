const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    
    // test('Return an Array', () => {
    //     let arr = [1,2,3,4,5]
        
    //     expect((shuffleArray(arr)).toBe('array'))
    // })

    test('check the lenght and see if they are the same', () => {

        let arr = [1,2,3,4,5]
        let results = shuffleArray(arr)

        expect(arr.length).toBe(results.length)   
     })

     test('return an array with same times', () => {
        //create array
        //run though shuffle array function
        //Check to make sure all original values are included in new array 
        let arr = [1,2,3,4,5]
        let results = shuffleArray(arr)

        let myArr = true

        for(let i = 0; i < results.length; i++){
           
            if(arr.includes(results[i]) === false){

               
                myArr = false
                
                return
            }
        }
        expect(myArr).toBe(true)
     })
})