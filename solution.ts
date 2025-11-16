type Value1 = string | number | boolean;

const formatValue = (value : Value1) : Value1 => {
    
    if(typeof value === 'string'){
        return value.toUpperCase();
    }
    else if(typeof value === 'number'){
        return value * 10;
    }

    return !value;
} 

type Value = string | number [];

const getLength = (value : Value) : number => {

    if(typeof value === "string"){
        return value.length;
    }
    return value.length;
}

class Person {
    name : string;
    age : number;

    constructor(name : string, age : number){
        this.name = name;
        this.age = age;
    }

    getDetails(){
        return `Name: ${this.name}, Age: ${this.age}`
    }
}

type Book = {
    title : string;
    rating : number;
}

const filterByRating = (arr : Book[]) : Book [] => {

    const filterResult = arr.filter((book) => book.rating > 4);

    return filterResult;
}

type User = {
    id : number; 
    name : string;
    email: string;
    isActive : boolean;
}

const filterActiveUsers = (arr : User[]) : User[] => {

    const filterActiveUsers = arr.filter((user) => user.isActive);

    return filterActiveUsers;
}


interface Book1 {
    title : string; 
    author : string;
    publishedYear : number;
    isAvailable : boolean
}

const printBookDetails = (value : Book1) => {
    console.log(`Title: ${value.title}, Author: ${value.author}, Published: ${value.publishedYear}, Available: ${value.isAvailable ? "Yes" : "No"}`);
} 


type Primitives = number | string;

const getUniqueValues = <T extends Primitives>(arr1: T[], arr2: T[]): T[] => {

    const result : T[] = []; 

    const addUniqueValue = (arr : T[]) => {
        for(let i = 0; i < arr.length; i++){
            let exits = false;

            for(let j = 0; j < result.length; j++){
                if(arr[i] === result[j]){
                    exits = true;
                    break;
                }
            }

            if(!exits){
                result.push(arr[i]);
            }
        }
    }

    addUniqueValue(arr1);
    addUniqueValue(arr2);

    return result;
}


interface Product {
    name : string;
    price : number;
    quantity : number;
    discount? : number;
}

const calculateTotalPrice = (arr : Product[]) : number => {

    const totalPrice = arr.reduce((acc, curr) => {
        const basePrice = curr.price * curr.quantity;
        const discountedPrice = curr.discount ? basePrice - (basePrice * curr.discount) / 100 : basePrice;
        return acc += discountedPrice;
    }, 0)

    return totalPrice;
} 


