import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import {
  Button,
  FormGroup,
  Label,
  Input,
  DropdownItem,
  Row,
  Col
} from 'reactstrap';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getCompanyData } from '../../../store/Auth/selectors';
import TableWithSorting, { comparators } from '../../../components/TableWithSorting';
import { getIn } from '../../../utils';
import ModalToggle from '../ModalToggle';
import Select from '../../../components/InputSelect2';

const StyledList = styled.ul`
  li {
    span {
      &:nth-child(1) {
        flex: 0 0 20%;
      }
      &:nth-child(2) {
        flex: 0 0 27%;
      }
      &:nth-child(3) {
        flex: 0 0 18%;
      }
      &:nth-child(4) {
        flex: 0 0 18%;
      }
      &:nth-child(5) {
        flex: 0 0 12%;
      }
      &:nth-child(6) {
        flex: 1 0 auto;
        text-align: right;
      }
    }
  }
  svg.editBtn {
    &:hover {
      cursor: pointer;
      color: var(--sherpaBlue);
    }
  }
  svg.editBtn {
    &:hover {
      cursor: pointer;
      color: var(--sherpaBlue);
    }
  }
`;
const checkIcon = <FontAwesomeIcon icon="check-circle" color="var(--green)" className="mr-1" />;
const inActiveIcon = <FontAwesomeIcon icon="times-circle" color="var(--red)" className="mr-1" />;
const plusIcon = <FontAwesomeIcon icon="plus" />;

// sorting headers that will be used to render the clickable sorting
// options.
const headers = [
  {
    active: true,
    sorting: 1,      // used to find the appropriate comparator function
    name: 'A to Z',
    type: 'string',  // used to find the approrpriate comparator function
    path: ['user', 'fullName'] // used to find the approrpiate data to sort by
  },
  null,
  null,
  {
    active: false,
    sorting: 0,
    name: 'Role',
    type: 'string',
    path: ['role']
  },
  {
    active: false,
    sorting: 0,
    name: 'Status',
    type: 'boolean',
    path: ['user', 'isActive']
  },
  null
];

const roleOpts = (
  <>
    <DropdownItem>1</DropdownItem>
    <DropdownItem>2</DropdownItem>
    <DropdownItem>3</DropdownItem>
    <DropdownItem>4</DropdownItem>
    <DropdownItem>5</DropdownItem>
  </>
);

const statusOpts = (
  <>
    <DropdownItem>1</DropdownItem>
    <DropdownItem>2</DropdownItem>
    <DropdownItem>3</DropdownItem>
    <DropdownItem>4</DropdownItem>
    <DropdownItem>5</DropdownItem>
  </>
);

// modals
const editModal = (
  <form>
    <Row form>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's first name" type="text" name="firstName" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="lastname">Last Name</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's last name" type="text" name="lastname" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
    </Row>
    <Row form>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's email" type="email" name="email" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="mobile">Mobile</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's Mobile Number" type="tel" name="mobile" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
    </Row>
    <Row form>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="role">Role</Label>
          <Select placeholder="Enter user's role" options={roleOpts} />
        </FormGroup>
      </Col>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select placeholder="Enter user's status" options={statusOpts} />
        </FormGroup>
      </Col>
    </Row>
  </form>
);

// modal configs
const editConfig = {
  title: "Edit Profile",
  btnTxt: "Save",
  inner: editModal,
  onSubmit: () => { console.log("submitted modal") }
};

function UsersTab(props) {
  const [activeSort, setActiveSort] = useState({ id: 0, sorting: 1 });
  const company = useSelector(getCompanyData);
  const sortedUsers = useMemo(() => {
    // runs whenever the active sort changes, it grabs the id and
    // sorting-direction that needs to be sorted by.
    const { type, path } = headers[activeSort.id];
    const comparator = comparators[type][activeSort.sorting];
    const users = company.profiles.concat().sort(
      (value1, value2) => comparator(getIn(path, value1), getIn(path, value2))
    );

    return users;
  }, [company.profiles, activeSort]);

  const editIcon = (
    <ModalToggle config={editConfig} >
      <FontAwesomeIcon
        className="editBtn" icon="pencil-alt" size="md" color="var(--green)" />
    </ModalToggle>
  );

  // header buttons
  const usersHeaderBtn = (
    <Button color="primary" size="md" onClick={() => { }}>
      {plusIcon}
      Add New User
    </Button>
  );

  // header components
  const usersHeader = (
    <SectionHeader
      title="Users"
      btn={usersHeaderBtn}
    />
  );
  return (
    <>
      <TableWithSorting
        header={usersHeader}
        listStyle={StyledList}
        headers={headers}
        setActiveSort={setActiveSort}
      >
        {sortedUsers.map((profile) => (
          <li data-test={`user-${profile.id}`} className="item textM mb-1" key={profile.id}>
            <span>{profile.user.fullName}</span>
            <span className="gray">{profile.user.email}</span>
            <span className="gray">{profile.phone || '---'}</span>
            <span>{profile.role}</span>
            {profile.user.isActive ?
              <span>{checkIcon}Active</span> : <span>{inActiveIcon}Inactive</span>}
            <span>{editIcon}</span>
          </li>
        ))}
      </TableWithSorting>
    </>
  );
}

export default UsersTab;
