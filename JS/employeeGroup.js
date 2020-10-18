import React, { Component } from 'react';

class EmployeeGroup extends Component {
  
    constructor(props) {
        super(props);
    }

    getElement(year, yearArr) {
        return (
            <div key={year} className="year-wrapper">
                <div className="year">{year}</div>
                <div className="total">Total {yearArr.length}</div>
                {yearArr.map((name, index) => {
                    return <div key={index} className="employee">
                        <div className="name">{name.firstName} {name.lastName}</div>
                    </div>
                })}
            </div>
        );
    }

    render() {
        let yearObj = this.props.data;
        return (
            <div className="main">
                {Object.keys(yearObj).map(val=>{
                    return this.getElement(val, yearObj[val])
                })}
            </div>
        );
    }
}


export default EmployeeGroup;


// const finalExpectedJSON = {
//     "1991": [
//         "Prithvi",
//         "Prabhat",
//         "Grace",
//         "Sanjay",
//         "C. Vaibhav",
//         "Mohinder Pratap",
//         "Anupam",
//         "Prashant",
//         "Nayan",
//         "Manoj Kumar",
//         "Rahul",
//         "Surendra Babu",
//         "Anirudh",
//         "Dharmendra",
//         "Sasikiran",
//         "Puneet",
//         "Harsh",
//         "Aakanksha",
//         "Atif",
//         "Bandana",
//         "Deepanshu",
//         "Sudhir",
//         "Kumar Binit",
//         "Priyanka",
//         "Vasundhara",
//         "Kangan",
//         "Preeti",
//         "Prabhat",
//         "Akin",
//         "Abhishek",
//         "Krishna"
//     ]
// }