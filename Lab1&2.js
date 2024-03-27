let instructorsArray=[{_id:6,firstName:"noha",lastName:"hesham",
                age:21,salary:3500,
                address:{city:"cairo",street:10,building:8},
                courses:["js","mvc","signalR","expressjs"]},
                
                {_id:7,firstName:"mona",lastName:"ahmed",
                age:21,salary:3600,
                address:{city:"cairo",street:20,building:8},
                courses:["es6","mvc","signalR","expressjs"]},
                
                {_id:8,firstName:"mazen",lastName:"mohammed",
                age:21,salary:7040,
                address:{city:"Ismailia",street:10,building:8},
                courses:["asp.net","mvc","EF"]},
                
                {_id:9,firstName:"ebtesam",lastName:"hesham",
                age:21,salary:7500,
                address:{city:"mansoura",street:14,building:3},
                courses:["js","html5","signalR","expressjs","bootstrap"]}
            ];

//Lab1
//6) a- Insert your own data
db.Instructors.insertOne({firstName:"merna",lastName:"gamal",age:"25"});

//6) b. Insert instructor without firstName and LastName (mongo will raise an error or not ?) Not
db.Instructors.insertOne({age:"25"});

//6) c. Using array contained with lab folder instructors.txt file
db.Instructors.insertMany(instructorsArray);

//7) a. Display all documents for instructors collection
db.Instructors.find();

//7) b. Display all instructors with fields firstName, lastName and address
db.Instructors.find({},{_id:0, firstName:1,lastName:1, address:1});

//7) c. Display firstName and city(not full address) for instructors with age 21.
db.Instructors.find({age:21},{_id:0, firstName:1, "address.city":true});

//7) d. Display firstName and age for instructors live in Mansoura city.
db.Instructors.find({"address.city":"mansoura"},{_id:0, firstName:1, age:1});

//e. Try to run these 1)
db.Instructors.find({firstName:"merna"},{lastName:"gamal"},{firstName: 1,lastName:1})
// Will search for instructor who has lastName:"gamal" only and escape the first name option

//e. Try to run these 2)
db.Instructors.find({courses:"mvc"},{firstName:1,courses:1}) 
// MongoDB will search the Instructors collection for documents where the courses array contains the element "mvc".
//For each matching document, MongoDB will include the firstName and courses fields in the result.
//If there are multiple documents that match the query criteria, MongoDB will return a cursor object with those documents.

//Lab2
//1) a. Display all documents in instructors collection
db.Instructors.find();

//b. Display all instructors with salaries greater than 4000 (only show firstName and salary)
db.Instructors.find({salary:{$gt:4000}},{_id:0, firstName:1,salary:1});

//c. Display all instructors with ages less than or equal 25.
db.Instructors.find({age:{$lte:25}});

//d. Display all instructors with city mansoura and sreet number 10 or 14 only display (firstname,address,salary).
db.Instructors.find({$and:[{"address.city":"mansoura"},{$or:[{"address.street":10},{"address.street":14}]}]});

//e. Display all instructors who have js and jquery in their courses (both of them not one of them).
db.Instructors.find({courses:{$all:['js','jquery']}})

//f. Display number of courses for each instructor and display first name with number of courses.
db.Instructors.find({courses:{$exists:true}}).forEach(i=>{
    print(`${i.firstName} ${i.courses.length}`);
});

//g- Write mongodb query to get all instructors that have firstName and lastName properties , sort them by firstName ascending then by lastName descending and finally display their data FullName and age
db.Instructors.find(
    { firstName: { $exists: true }, lastName: { $exists: true } },
    { _id: 0, firstName: 1,lastName:1, age: 1 }
).sort({ firstName: 1, lastName: -1 }).forEach(instructor => {
    print(`FullName : ${instructor.firstName}  ${instructor.lastName}, Age: ${instructor.age}`);
});

//h. Find all instructors that have fullName that contains “mohammed”
db.Instructors.insertOne({firstName:"mohammed",lastName:"gamal",age:"25"});
db.Instructors.find({$or:[{firstName:"mohammed"},{lastName:"mohammed"}]});

//i. Delete instructor with first name “ebtesam” and has only 5 courses in courses array
db.Instructors.deleteOne({firstName: "ebtesam",courses: { $size: 5 }});

//j. Add active property to all instructors and set its value to true.
db.Instructors.updateMany({},{$set:{active:true}});

//k. Change “EF” course to “jquery” for “mazen mohammed” instructor (without knowing EF Index)
db.Instructors.updateOne(
    { firstName: "mazen", lastName: "mohammed", courses: "EF" },
    { $set: { "courses.$": "jquery" } }
);

//l. Add jquery course for “noha hesham”.
db.Instructors.updateOne(
    { firstName: "noha", lastName: "hesham"},
    {$push:{courses:"jquery"} }
);

//m. Remove courses property for “mona ahmed ” instructor
db.Instructors.updateOne(
    { firstName: "mona", lastName: "ahmed" },
    { $unset: { courses: "" } }
);

//n. Decrease salary by 500 for all instructors that has only 3 courses in their list ($inc)
db.Instructors.updateMany(
    { courses: { $size: 3 } }, 
    { $inc: { salary: -500 } } 
);

//o. Rename address field for all instructors to fullAddress.
db.Instructors.updateMany({},{$rename:{address:'fullAddress'}})

//p. Change street number for noha hesham to 20
db.Instructors.updateOne(
    { firstName: "noha", lastName: "hesham" },
    { $set: { "fullAddress.street": 20 } }
);

