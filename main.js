
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
