import React,{Component} from "react";
import {Table} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';

export class Home extends Component{
    
    constructor(props){
        super(props);
        this.state={emps:[]}
    }

    refreshList(){
        fetch('http://localhost:5220/api/employee/getall?page=1&pageSize=10')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data.data});
        });
    }

    
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    handleFileSelected(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch('http://localhost:5220/api/employee/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.refreshList();
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        const {emps}=this.state;
        return (
            <Row>
                 <Col sm={12}>
                 <input onChange={this.handleFileSelected} type="File" accept=".xls"/>
                 </Col>
                 <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                        <th>Name</th>
                        <th>Address1</th>
                        <th>Address2</th>
                        <th>PostCode</th>
                        <th>County</th>
                        <th>Designation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.addr1}</td>
                                <td>{emp.addr2}</td>
                                <td>{emp.postCode}</td>
                                <td>{emp.county}</td>
                                <td>{emp.designation}</td>
                            </tr>)}
                    </tbody>

                </Table>
                </div>
                </Row>
        )
    }
}