import React, { Component } from 'react';

class EmployeeTree extends Component {
  
    // constructor(props) {
    //     super(props);

    //     this.treeQueue = [];
    //     this.treeQueue.push(this.props.companyCEOemployeeID);

    //     while(this.treeQueue.length){
    //         let currentEmployee = this.treeQueue.shift();
    //         let reporterList = this.props.treeObject[currentEmployee];
    //         let logString = "";
    //         if(reporterList && reporterList.length){
    //             reporterList.forEach(reporter => {
    //                 this.treeQueue.push(reporter.employeeID);
    //                 logString += reporter.employeeID + " ";
    //             })
    //         }
    //         console.log(currentEmployee, '\n', logString ? logString : "No reporter");
    //     }
    // }

    getElement(boss, reporterList) {
        let bossObject = this.props.mappedData[boss];
        if(bossObject && bossObject.photo.indexOf('viewPhoto') !== -1){
            bossObject.photo = 'https://people.zoho.com/' + bossObject.photo.replace('&#x3f;', '?').replace('&#x3d;', '='); 
        }
        else if(bossObject){
            bossObject.photo = 'https://contacts.zoho.com/file?ID=648041888&fs=thumb';
        }
        if(bossObject){
            return (
                <React.Fragment>
                    <div className="boss">
                        <img src={bossObject.photo} />
                        <span>{bossObject.firstName} {bossObject.lastName} {bossObject.employeeID}</span>
                    </div>
                    <div></div>
                    {reporterList && reporterList.length ? reporterList.map(reporter => {
                        return (
                            <div className={`reporter-list`}>
                                {this.getElement(reporter.employeeID, this.props.treeObject[reporter.employeeID])}
                            </div>
                        )
                    }) : null}
                </React.Fragment>
            )
        }
        else{
            return null;
        }
    }

    render() {
        return this.getElement(this.props.companyCEOemployeeID, this.props.treeObject[this.props.companyCEOemployeeID])
    }
}


export default EmployeeTree;