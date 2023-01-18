
//Comentado
// const juan = {
//     name: "Juan",
//     age: 18,
//     approvedCourses: [
//         "Course 1",
//     ],
//     addCourse(newCourse) {
//         this.approvedCourses.push(newCourse)
//     }
// };

// console.log(Object.keys(juan));
// console.log(Object.getOwnPropertyNames(juan));
// console.log(Object.entries(juan));//las anteriores hacen referencia al objeto juan, esta puede no funcionar ya que estamos convirtiendo todo en un array de arrays y por tanto, al introducirnos en juan puede que no nos funcione. Tenemos que tener mucho ojo con esto

// console.log(Object.getOwnPropertyDescriptors(juan));

// Object.defineProperty(
//     juan,
//     "pruebaNasa",
//     {
//         value: "extraterrestres",
//         writable: true, //con esta en false no nos pemite modificar los elementos donde esta esté peros i nos permite hacer delate
//         enumerable: true, //si le ponemos false, al llamar a la propiedad .keys() no nos aparece
//         configurable: true, //eta nos permite modificar las propiedades pero no nos permite eliminarla, hacerle delate
//     }
// ); 
//este método nos permite definir nuevas propiedades al objeto que nosotros queramos. Le tenemos que introducir varios parámetros:
    //1. nombre del objeto que queremos modificar
    //2. nombre de la propiedad que vamos a definir
    //3. objeto que tenga en su interiror a la vez varios parámetros

//Tenemos dos métodos que nos permiten modificar las propiedades writable, enumerable, configurable sin tener que entrar y hacer tanto código y estas son:

    // Object.seal(juan); //esta nos permite que nuestras propiedades no se puedan eliminar. Me pone configurable como false
    // Object.freeze(juan); // esta además de poner como configurable como false, también me pone writable y por tanto, tampoco nos permite modificar las propiedades


//Resolución del problema de la copia de objetos

// const obj1 = {
//     a: "a",
//     b: "b",
// };

// const obj2 = {};
// for (prop in obj1) {
//     obj2[prop] = obj1[prop];
// }//esta forma para solucionar la copia y modificación de los objetos funciona solo cuando hay objetos "simples", es decir, cuando no hay objetos dentro de otros objetos. Si los hubiera, al modificar uno, se me modificaría el otro tb

// obj3 =  Object.assign({}, obj1);
// obj4 =  Object.create(obj1); //el .create() afecta la modificación del objeto original a la copia pero no de la copia al padre ya que crea las modificaciones como si fueran nuevas caracteríasticas 

// const stringfiedComplexObj = JSON.stringify(obj1); //esto lo quenos hace es convertir un objeto en un string
// const obj5 = JSON.parse(stringfiedComplexObj); //esto es el contrario de la anterior, nos convierte un string en un objeto 


//RECURSIVIDAD

// function recursiva(parametro){
//     if() {

//     } else {

//     }
// }

// const numeritos = [0,1,2,3,4,5,6,7,8,9,10,2,39,58,189,395];
// // let numerito = 0;
// // for (let index = 0; index < numeritos.length; index++) {
// //     numerito = numeritos[index];
// //     console.log( {index, numerito} );
// // }

// function recursiva(numbersArray) {
//     if(numbersArray.lenght != 0) {
//         const firstNum = numbersArray[0];
//         console.log(firstNum);

//         numbersArray.shift();
//         recursiva(numbersArray);
//     }
// }

//deep copy con recursividad 
//esto lo que nos ayuda es que por muchos métodos quetengamos dentro de los objetos, van a funcionar hagamos lasa copias que hagamos


function isObject (subject) { //funcion para validad si el objeto es un objeto
    return typeof subject == "object";
};

function isArray (subject) { //funcion para validar si el subject es un array
    return Array.isArray(subject);
};

function deepCopy (subject) { //dentro del () ponemos el obj1 que es el que querriamos copiar
    let copySubject;

    const subjectIsArray = isArray(subject);
    const subjectIsObject = isObject(subject);

    if(subjectIsArray) {
        copySubject = []; //si es una rray le ponemos los []
    } else if (subjectIsObject) {
        copySubject = {};// si es un objeto le ponemos {}
    } else {
        return subject;//si no es ni objeto ni array me lo devuelve tal cual era
    }

    for (key in subject) { //key es el valor, la asignación y con este ciclo loq ue hacemos es llevar a la función deepCopy lo valores dentro del subject para que valide si son arrays u objetos y que los muestre y así poder tener estos objetos y arrays a la vista
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject 
            }
        }
    }

    return copySubject;
}

//abstracción y encapsulamiento

//objeto literal
const basicStudent = {
    name: undefined,
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPath: undefined,
    socialMedia: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
        github: undefined,
    },
};

const juan = deepCopy(basicStudent);
// Object.defineProperty(juan, "name", {
//     value: "Juanito",
//     configurable: false, //nos obliga a no poder borrar la propiedad name
// });
Object.seal(juan)//con esta propiedad nos podemos evitar la propiedad .definedProperty() y si queremos modificar el mombre o cualquier otra propiedad solo tenemos que hacer lo siguiente:
juan.name = "Juanito";

Object.isSealed(juan);
Object.isFrozen(juan);
//Estas dos propiedades lo que me dan son valores buleanos, es decir, true or false. La propiedad .isSealed() no dice si nuestro objeto, juan, está protegido contra las eliminaciones de sus propiedades (cosa que conseguimos que sea true gracias al .seal() ). Mientras que el .inFrozen() nos da su buleano depensiendo de si tiene la propiedad .freeze() nuestro objeto, juan, la cual nos hace que no puedan ser modificados los valores de sus propiedades.


//Factory pattern y RORO

function requiredParams (param) { //creamos esta función para decirle al usuario cunado entre que los prametros email y name son obligatorios ya que es la forma de validar que es un estudiante
    throw new Error(param + " es obligatorio");
};

function learningPath({//borramos el create del LearningPath para los métodos públicos
    name = requiredParams("name"),
    courses = [],
}) {
    //lo guardamos así por los métodos públicos
    this.name = name;
    this.courses = courses;

    //comentamos esto porque ahora vamos a dejar de trabajar con los métodos privados
    // const private = {
    //     "_name": name,
    //     "_courses": courses,
    // };

    // const public = {
    //     get name() {
    //         return private["_name"];
    //     },
    //     set name(newName) {
    //         if (newName.lenght != 0) {
    //             private["_name"] = newName;
    //         } else {
    //             console.warn("Tu nombre debe tener al menos 1 caracter");
    //         }
    //     },
    //     get courses() {
    //         return private["_courses"];
    //     },//quitamos el set porque no podemos añadir cursos a las rutas porque no somos los profesores sino los alumnos
    // };

    // return public;
}

function Student({ ////borramos el create del LearningPath para los métodos públicos
    //el parámetro que vamos a definir es un objeto así el orden en que enviemos los datos no va a importar
    name = requiredParams("name"), //para "obligarle" a que no esté vacio
    email = requiredParams("email"),//para "obligarle" a que no esté vacio
    age,
    twitter,
    facebook,
    instagram,
    github,
    approvedCourses = [],
    learningPaths = [],
} = {}) { // este = {} nos dice que por defecto el objeto que vamos a enviar es un objeto vacio así si un estudiante no nos imprime nada, no nos dará error

    //para los méodos públicos tenemos que guardarlos de la forma this.
    this.name = name;
    this.email = email;
    this.age = age;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
        github,
    };
    this.approvedCourses = approvedCourses;
    // this.learningPath = learningPath;


    if(isArray(learningPaths)){
        this.learningPaths = [];
    };

    for (learningPathIndex in learningPaths){
        if(learningPaths[learningPathIndex] instanceof learningPath) {
            this.learningPaths.push(learningPaths[learningPathIndex]);

        }
    }

    
    //Lo comentamos porque vamos a trabajar con los métodos privados
    // const private = {
    //     "_name": name, //el guión bajo es la convención para que sean propiedades privasdas
    //     "_learningPath": learningPath,
    // };


    // const public = {
    //     email,
    //     age,
    //     socialMedia: {
    //         twitter,
    //         facebook,
    //         github,
    //         instagram,
    //     },
    //     approvedCourses,
    //     // readName () {
    //     //     return private["_name"];
    //     // },
    //     // changeName (newName) {
    //     //     private["_name"] = newName;
    //     // },
    //     get name(){
    //         return private["_name"];
    //     },
    //     set name(newName) {
    //         if (newName.lenght != 0){
    //             private["_name"] = newName;
    //         } else {
    //             console.warn("Tu nombre debe tener al menos 1 caracter");
    //         }
    //     },
    //     get learningPath() {
    //         return private["_learningPath"];
    //     },
    //     set learningPath(newLP) {
    //         if(!newLP.name) {
    //             console.warn("Tu LP no tiene la propiedad name");
    //             return;
    //         }
    //         if (!newLP.courses) {
    //             console.warn("Tu LP no tiene una lista de courses");
    //             return;
    //         }
    //         if (!isArray(newLP.courses)) {
    //             console.warn("Tu LP no tiene una lista de courses");
    //             return;
    //         }
    //         private["_learningPath"].push(newLP);
    //     },
    
    // };

    // // Object.defineProperty(public, "readName", {
    // //     writable: false,
    // //     configurable: false,
    // // }); //el problema de esto es que con el polimorfismo no podemos editar esto

    // // Object.defineProperty(public, "changeName", {
    // //     writable: false,
    // //     configurable: false,
    // // }); //no podemos editarlos con el polimorfismo
    // // return public;
    // return public;

};

const escuelaWeb = new learningPath({ name: "Escuela de WebDev" });
const escuelaData = new learningPath({ name: "Escuela de Data Science" });

const mery = new Student({
    // age: 32,
    name: "Mery",
    email: "mery@mery.com",
    // twitter: "/mery_1"
    learningPaths: [
        escuelaData,
        escuelaWeb,
    ],
});
// const mariano = createStudent(); //este nos dará un error porque no le hemos dado ni un nombre ni un email