import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, HealthRatingOption, SelectField } from "./FormField";
import {
  HealthCheckEntryProps,
  HealthCheckRating,
  HealthCheck,
} from "../types";
import { DiagnosisSelection } from "./FormField";

interface Props {
  onSubmit: (values: HealthCheckEntryProps) => void;
  onCancel: () => void;
}

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheck.Healthy, label: "Healthy" },
  { value: HealthCheck.LowRisk, label: "Low Risk" },
  { value: HealthCheck.HighRisk, label: "High Risk" },
  { value: HealthCheck.CriticalRisk, label: "Critical Risk" },
];

export const AddHealthCheckEntryForm: React.FC<Props> = ({
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
        type: "HealthCheck",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <div>
            <hr />
            <h3>Add Health Check Entry Form</h3>
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

              <SelectField
                name="healthCheckRating"
                label="Health Check Rating"
                options={healthRatingOptions}
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

export default AddHealthCheckEntryForm;
