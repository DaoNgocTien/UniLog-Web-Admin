import React from 'react';
//reactstrap components
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
    // Input,
    // UncontrolledTooltip
    // Button,
    // Modal,
    // ModalHeader,
    // ModalBody,
    // ModalFooter
} from "reactstrap";

const uuidv1 = require("uuid/v1");

const ProjectAssignment = props => {

    let { header = [], fromProps: { data = [], assign, userId, type, userRole, userProject } } = props;
    const assignEmployee = (e, id) => {
        e.preventDefault();
        let createModel = {
            id: userId,
            application_id: userRole === 2 ? id : 0,
            Application_instance_id: userRole !== 2 ? id : 0
        }
        assign(createModel);
    }
    const checkJoinedProject = id => {
        return userProject.length > 0 ?
            userProject.find(project => {
                console.log("checkJoinedProject " + userRole + " id " + id + " application_id " + project.application_id + " ins " + project.application_instance_id);
                return userRole === 2 ?
                    project.application_id === id :
                    project.application_instance_id === id
            }) : false;
    }
    return (
        <>
            {/* Page Content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h4 className="text-uppercase text-light ls-1 mb-1">
                                            PROJECT IN SYSTEM
                    </h4>
                                        <h2 className="text-dark mb-0">
                                            {/* <span className="d-none d-md-block">{"name"}</span> */}
                                            <span className="d-md-none">S</span>
                                        </h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        {header.map((header, key) => (
                                            <th scope="col" key={uuidv1()}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data[0] != null ? data.map((app, key) => (
                                        // Hide intended application / application instance
                                        app.id !== 22 ?
                                            <>
                                                <tr>
                                                    <td  key={uuidv1()}>
                                                        {app.name}

                                                    </td>

                                                    <td  key={uuidv1()}>
                                                        {type}
                                                    </td>
                                                    <td  key={uuidv1()}>
                                                        {app.description}
                                                    </td>


                                                    <td className="text-right">
                                                        <Button
                                                            color={checkJoinedProject(app.id) ? "primary" : "danger"}
                                                            onClick={e => assignEmployee(e, app.id)}
                                                        >
                                                            {checkJoinedProject(app.id) ? "Left" : "Join"}
                                                        </Button>
                                                        {/* <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            className="btn-icon-only text-light"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            <i className="fas fa-ellipsis-v" />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={e => assignEmployee(e, app.id)}
                                                            >

                                                                Assign
            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown> */}
                                                    </td>
                                                </tr>
                                            </> : null
                                    )) : null
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );

}

export default ProjectAssignment;