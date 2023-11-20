//Function is a reusable piece of code that can be called upon over and over again.
//creating a bracket after a function enables us pass parameters. e.g productName, event, quantity, etc...
    function createItem(productName, price, quantity) {
        //write your code inside this block.


        //we use return to get the final output of the code.
        return{
            name: productName,
            price: price,
            quantity: quantity,
            total: price * quantity
        };
    };

    //using this function
    const item1 = createItem("ps5", 456992, 223);

    //working on object.
    //use dot notation or square bracket to retrieve value of a data stored in the object.
    // console.log(item1.name);
    // console.log(item1.total);


    //if/else  if else.  or if         else  if        else.

    if(100 > 200) {
        console.log("This means 100 is greater than 200");
    } else if(100 < 200) {
        console.log("100 is less than 200");
    }  else {
        console.log("This is not true");
    }


    //Loop is used for repeating a piece of code a given number of times.
    //for loop download intellisense, nodejs, es6, snippet, tabnine.

    for (let index = 0; index < 10; index++) {
        console.log(index);
    }
