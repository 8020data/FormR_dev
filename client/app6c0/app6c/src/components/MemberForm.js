import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function MemberForm() {
  const initialValues = {
    MemberID: "",
    MemberNo: "",
    TitleName: "",
    FirstName: "",
    Middlename: "",
    LastName: "",
    PostName: "",
    Company: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
    Country: "",
    Phone1: "",
    Phone2: "",
    Fax: "",
    WebSite: "",
    Email: "",
    Skills: "",
    Active: "",
    Bio: "",
    createdAt: "",
    updatedAt: "",
    LastUpdated: "",
  };
  const validationSchema = Yup.object({
    MemberID: Yup.string().required("Required"),
    MemberNo: Yup.string().required("Required"),
    TitleName: Yup.string().required("Required"),
    FirstName: Yup.string().required("Required"),
    Middlename: Yup.string().required("Required"),
    LastName: Yup.string().required("Required"),
    PostName: Yup.string().required("Required"),
    Company: Yup.string().required("Required"),
    Address1: Yup.string().required("Required"),
    Address2: Yup.string().required("Required"),
    City: Yup.string().required("Required"),
    State: Yup.string().required("Required"),
    Zip: Yup.string().required("Required"),
    Country: Yup.string().required("Required"),
    Phone1: Yup.string().required("Required"),
    Phone2: Yup.string().required("Required"),
    Fax: Yup.string().required("Required"),
    WebSite: Yup.string().required("Required"),
    Email: Yup.string().required("Required"),
    Skills: Yup.string().required("Required"),
    Active: Yup.string().required("Required"),
    Bio: Yup.string().required("Required"),
    createdAt: Yup.string().required("Required"),
    updatedAt: Yup.string().required("Required"),
    LastUpdated: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="text"
            label="MemberID"
            name="MemberID"
          />
          <FormikControl
            control="input"
            type="text"
            label="MemberNo"
            name="MemberNo"
          />
          <FormikControl
            control="input"
            type="text"
            label="TitleName"
            name="TitleName"
          />
          <FormikControl
            control="input"
            type="text"
            label="FirstName"
            name="FirstName"
          />
          <FormikControl
            control="input"
            type="text"
            label="Middlename"
            name="Middlename"
          />
          <FormikControl
            control="input"
            type="text"
            label="LastName"
            name="LastName"
          />
          <FormikControl
            control="input"
            type="text"
            label="PostName"
            name="PostName"
          />
          <FormikControl
            control="input"
            type="text"
            label="Company"
            name="Company"
          />
          <FormikControl
            control="input"
            type="text"
            label="Address1"
            name="Address1"
          />
          <FormikControl
            control="input"
            type="text"
            label="Address2"
            name="Address2"
          />
          <FormikControl
            control="input"
            type="text"
            label="City"
            name="City"
          />
          <FormikControl
            control="input"
            type="text"
            label="State"
            name="State"
          />
          <FormikControl
            control="input"
            type="text"
            label="Zip"
            name="Zip"
          />
          <FormikControl
            control="input"
            type="text"
            label="Country"
            name="Country"
          />
          <FormikControl
            control="input"
            type="text"
            label="Phone1"
            name="Phone1"
          />
          <FormikControl
            control="input"
            type="text"
            label="Phone2"
            name="Phone2"
          />
          <FormikControl control="input" type="text" label="Fax" name="Fax" />
          <FormikControl
            control="input"
            type="text"
            label="WebSite"
            name="WebSite"
          />
          <FormikControl
            control="input"
            type="text"
            label="Email"
            name="Email"
          />
          <FormikControl
            control="input"
            type="text"
            label="Skills"
            name="Skills"
          />
          <FormikControl
            control="input"
            type="text"
            label="Active"
            name="Active"
          />
          <FormikControl control="input" type="text" label="Bio" name="Bio" />
          <FormikControl
            control="date"
            type="text"
            label="createdAt"
            name="createdAt"
          />
          <FormikControl
            control="input"
            type="text"
            label="updatedAt"
            name="updatedAt"
          />
          <FormikControl
            control="input"
            type="text"
            label="LastUpdated"
            name="LastUpdated"
          />

          <button type="submit" disabled={!formik.isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default MemberForm;
