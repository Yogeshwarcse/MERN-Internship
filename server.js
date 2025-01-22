// const fs = require('fs');

// const newPerson = {
//     name: "John",
//     age: 25,
//     city: "New York",
//     amount: 1500
// };

// fs.readFile('sample.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     const json = JSON.parse(data);

//     const personIndex = json.findIndex(person => person.name === newPerson.name);

//     if (personIndex !== -1) {
//         json[personIndex] = newPerson;
//     } else {
//         json.push(newPerson);
//     }

//     const updatedData = JSON.stringify(json, null, 2);  // Formatting with indentation

//     fs.writeFile('sample.json', updatedData, (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('Person added or updated successfully.');
//     });

//     console.log(json);
// });
const fs = require('fs');

// Sample student data
const newStudent = {
    name: "John",
    age: 25,
    city: "New York",
    amount: 1500
};

// Create: Add or update student details
function createOrUpdateStudent(student) {
    fs.readFile('students.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const students = JSON.parse(data);

        const studentIndex = students.findIndex(stud => stud.name === student.name);
        if (studentIndex !== -1) {
            students[studentIndex] = student; // Update student
        } else {
            students.push(student); // Create new student
        }

        const updatedData = JSON.stringify(students, null, 2);
        fs.writeFile('students.json', updatedData, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Student added or updated successfully.');
        });
    });
}

// Read: Fetch all students
function readStudents() {
    fs.readFile('students.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const students = JSON.parse(data);
        console.log(students);
    });
}

// Update: Update specific student by name
function updateStudent(name, updatedDetails) {
    fs.readFile('students.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const students = JSON.parse(data);
        const studentIndex = students.findIndex(stud => stud.name === name);
        if (studentIndex !== -1) {
            students[studentIndex] = { ...students[studentIndex], ...updatedDetails }; // Merge with new details
            const updatedData = JSON.stringify(students, null, 2);
            fs.writeFile('students.json', updatedData, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Student updated successfully.');
            });
        } else {
            console.log('Student not found.');
        }
    });
}

// Delete: Remove student by name
function deleteStudent(name) {
    fs.readFile('students.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const students = JSON.parse(data);
        const studentIndex = students.findIndex(stud => stud.name === name);
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1); // Delete student
            const updatedData = JSON.stringify(students, null, 2);
            fs.writeFile('students.json', updatedData, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Student deleted successfully.');
            });
        } else {
            console.log('Student not found.');
        }
    });
}

// Example usage
createOrUpdateStudent(newStudent); 
readStudents();
updateStudent("John", { age: 26 }); 
deleteStudent("John"); 
