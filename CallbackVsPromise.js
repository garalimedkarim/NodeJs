JavaScript Promise vs Callback

A callback is a function that is passed to an another function. A callback may or may not be executed asynchronously. 

//Exple 1:
function two()
{
    return 2;
}
function x(y)
{
    //execute y
    return y();
}
console.log(x(two)); //2

Here two() is a function. We are passing it as callback to function x(). Function x() may or may not execute it asynchronously. Here callback is executed asynchronously.

A Promise is a object which takes a callback and executes it asynchronously. 

//Exple2 :
function two()
{
    return 2;
}
 
function error(e)
{
    console.log(e);
}

var promise = new Promise(function(callback, e){
    console.log(callback());
});

promise.then(two, error);


Here we passed two() as callback to promise’s then() function which is indeed executed asynchronously.