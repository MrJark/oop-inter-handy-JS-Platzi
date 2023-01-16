
const juan = {
    name: "Juan",
    age: 18,
    approvedCourses: [
        "Course 1",
    ],
    addCourse(newCourse) {
        this.approvedCourses.push(newCourse)
    }
};

// console.log(Object.keys(juan));
// console.log(Object.getOwnPropertyNames(juan));
// console.log(Object.entries(juan));//las anteriores hacen referencia al objeto juan, esta puede no funcionar ya que estamos convirtiendo todo en un array de arrays y por tanto, al introducirnos en juan puede que no nos funcione. Tenemos que tener mucho ojo con esto

console.log(Object.getOwnPropertyDescriptors(juan));

Object.defineProperty(
    juan,
    "pruebaNasa",
    {
        value: "extraterrestres",
        writable: true, //con esta en false no nos pemite modificar los elementos donde esta esté peros i nos permite hacer delate
        enumerable: true, //si le ponemos false, al llamar a la propiedad .keys() no nos aparece
        configurable: true, //eta nos permite modificar las propiedades pero no nos permite eliminarla, hacerle delate
    }
); //este método nos permite definir nuevas propiedades al objeto que nosotros queramos. Le tenemos que introducir varios parámetros:
    //1. nombre del objeto que queremos modificar
    //2. nombre de la propiedad que vamos a definir
    //3. objeto que tenga en su interiror a la vez varios parámetros

//Tenemos dos métodos que nos permiten modificar las propiedades writable, enumerable, configurable sin tener que entrar y hacer tanto código y estas son:

    Object.seal(juan); //esta nos permite que nuestras propiedades no se puedan eliminar. Me pone configurable como false
    Object.freeze(juan); // esta además de poner como configurable como false, también me pone writable y por tanto, tampoco nos permite modificar las propiedades


//Resolución del problema de la copia de objetos

const obj1 = {
    a: "a",
    b: "b",
};

const obj2 = {};
for (prop in obj1) {
    obj2[prop] = obj1[prop];
}//esta forma para solucionar la copia y modificación de los objetos funciona solo cuando hay objetos "simples", es decir, cuando no hay objetos dentro de otros objetos. Si los hubiera, al modificar uno, se me modificaría el otro tb

obj3 =  Object.assign({}, obj1);
obj4 =  Object.create(obj1); //el .create() afecta la modificación del objeto original a la copia pero no de la copia al padre ya que crea las modificaciones como si fueran nuevas caracteríasticas 

const stringfiedComplexObj = JSON.stringify(obj1); //esto lo quenos hace es convertir un objeto en un string
const obj5 = JSON.parse(stringfiedComplexObj); //esto es el contrario de la anterior, nos convierte un string en un objeto 