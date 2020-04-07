import React, { Component } from 'react';
//reactstrap components
import {
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    // Media,
    // Nav,
    // NavLink,
    // NavItem,
    // Progress,
    Table,
    Container,
    Row,
    // UncontrolledTooltip
    // Button,
    // Modal,
    // ModalHeader,
    // ModalBody,
    // ModalFooter
} from "reactstrap";

const uuidv1 = require("uuid/v1");

class Repo extends Component {

    render() {
        let { header = [],  repoList = [] } = this.props;
        console.log("Repo List: " + JSON.stringify(repoList));
        console.log("Repo List: " + JSON.stringify(this.props));
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
                                                REPO LIST
                    </h4>
                                            <h2 className="text-dark mb-0">
                                                {/* <span className="d-none d-md-block">{"name"}</span> */}
                                                <span className="d-md-none">S</span>
                                            </h2>
                                        </div>
                                        {/* <div className="col">
                                            <Nav className="justify-content-end" pills>
                                                <NavItem>
                                                    <NavLink
                                                        className={`classnames("py-2 px-3", {
                                active: this.state.activeNav === 1
                              })`}
                                                        href="#pablo"
                                                    //  onClick={e => this.toggleNavs(e, 1)}
                                                    >
                                                        <span className="d-none d-md-block">By Date</span>
                                                        <span className="d-md-none">D</span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div> */}
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
                                        {repoList[0] != null ? repoList.map((repo, key) => (
                                            <tr>
                                                <td scope="col" key={uuidv1()}>
                                                    {repo.name}
                                                </td>
                                                <td scope="col" key={uuidv1()}>
                                                    {repo.server.name}
                                                </td>
                                                <td scope="col" key={uuidv1()}>
                                                    {repo.repo_url}
                                                </td>
                                                
                                                <td className="text-right">
                                                    <UncontrolledDropdown>
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
                                                                // onClick={e => toggleInformationModal(e, serverId)}
                                                            >
                                                                Delete
            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
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
}

export default Repo;