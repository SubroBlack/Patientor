import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField } from "./FormField";
import { HospitalEntryProps } from "../types";
import { DiagnosisSelection } from "./FormField";

interface Props {
  onSubmit: (values: HospitalEntryProps) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        date: "",
        type: "Hospital",
        diagnosisCodes: [],
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.discharge.date) {
          errors.dischargedate = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.criteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <div>
            <hr />
            <h3>Add Hospital Entry</h3>
            <Form className="form ui">
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                name="discharge.criteria"
                component={TextField}
              />
              <Field
                label="Date for Discharge"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
