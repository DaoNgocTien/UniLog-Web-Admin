// reactstrap components
import {
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import React from "react";
 const LayoutSearchForm = props => {
  let { formProps, inputGroupProps, inputProps } = props;
  return (
    <Form className={formProps} onSubmit={e => SubmitForm(e)}>
      <InputGroup className={inputGroupProps}>
        <Input
          aria-label="Search"
          className={inputProps}
          placeholder="Search"
          type="search"
        />
        <InputGroupAddon addonType="prepend">
          <InputGroupText onClick={e => OnClickInputGroupText(e)}>
            <i className="fa fa-search-plus" aria-hidden="true"></i>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};
export default LayoutSearchForm;

const SubmitForm = e => {
    e.preventDefault();
    alert("Submit");
}

const OnClickInputGroupText = e => {
    e.preventDefault();
    alert("On Click");
}
