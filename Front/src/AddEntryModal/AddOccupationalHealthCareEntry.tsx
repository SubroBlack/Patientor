import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField } from "./FormField";
import { OccupationalHealthCareEntryProps } from "../types";
import { DiagnosisSelection } from "./FormField";

interface Props {
  onSubmit: (values: OccupationalHealthCareEntryProps) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthCareEntryForm: React.FC<Props> = ({
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
        type: "OccupationalHealthcare",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
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
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <div>
            <hr />
            <h3>Add Occupational Health Care Entry</h3>
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
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              />
              <Field
                label="Employer"
                placeholder="Employer"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Sick Leave Start"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="Sick Leave End"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
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

export default AddOccupationalHealthCareEntryForm;
