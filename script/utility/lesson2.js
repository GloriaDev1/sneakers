//CONTROL FLOW : IT IS ALL ABOUT DECISION MAKING . .... WHICH SCRIPT, CODE BLOCK, ROUTE TO TAKE TO EXECUTE A GIVEN TASK. WE perform task like this which entails branching using if else if else

if(5  > 6){
	// code to run if the condtion returns true
	console.log('The if block code ran')
}else if('boy' !='girl'){
	console.log('First Else if block ran')
}else if('boy' =='girl'){
	console.log('First Else if block ran')
}else{
	console.log('else block ran')
}

// function: Functions are reuseable piece of code. They enable us to create a code block once and then we can use it as much as we like
// creating a function start with the keyword function, then give it a name ,next is to include () : this will allow us pass in parameter if we need to,
// next will then be ur curly braces { } it is inside there we write our code 
// camocase : firstword is small letter while other new words start with Capital letter

// function can return or not return a value. if it does not then it returns undefined
function greetUser(username){
	// write your code in here
	console.log(`Hi ${username}, Welcome to js class`);
}

// how to use a function created ... just call it by it name and pass in any argument if the function requires it
greetUser('james');

greetUser('Paul')
greetUser('Mathew')
greetUser('Andrew')


// creating a function that returns a value 
function addNumbers(n1,n2){
	return n1 + n2;
}

let result1 = addNumbers(3,10)
console.log(result1)


// modern way of creating function is arrow function ..

// this is for a one line of code
const subtractNumber = (n1,n2) => n1 - n2

// but for a code block that extends more than one line 
const divideNumber = (n1,n2) => {
	let division = n1 / n2;
	return division;
}

let result2 = subtractNumber(5,3)
console.log(result2)


let result3 = divideNumber(20,4)
console.log(result3)
