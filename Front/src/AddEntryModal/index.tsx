import React, { useState } from "react";
import { Modal, Segment, Button } from "semantic-ui-react";
import { NewEntryProps } from "../types";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddHealthCheckEntryForm from "./AddHealthCheckEntry";
import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntry";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntryProps) => void;
  error?: string;
}

/*
const formChoose = (onSubmit: any, onClose: any) => {
  return (
    <div>
      <Button onClick={}>Add Hospital Entry</Button>
      <Button>Add Hospital Entry</Button>
    </div>
  );
}; */

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [form, setForm] = useState("");
  const showForm = () => {
    if (form === "Hospital") {
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (form === "HealthCheck") {
      return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (form === "OccupationalHealthCare") {
      return (
        <AddOccupationalHealthCareEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      );
    }
  };
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Button onClick={() => setForm("Hospital")}>Add Hospital Entry</Button>
        <Button onClick={() => setForm("HealthCheck")}>
          Add Health Check Entry
        </Button>
        <Button onClick={() => setForm("OccupationalHealthCare")}>
          Add Occupational Health Care Entry
        </Button>
        <br />
        {showForm()}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
