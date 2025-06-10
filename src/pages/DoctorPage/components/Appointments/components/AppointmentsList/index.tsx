import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "./AppointmentsList.css";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  PlusOutlined,
  ScheduleTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  selectAppointments,
  selectStatus,
  updateAppointmentStatus,
} from "../../../../../../features/appointments/appointmentsSlice";
import { Button, Input, message, Modal } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { addMedication } from "../../../../../../features/DoctorSlice";

dayjs.extend(utc);

interface AppointmentsListProps {
  searchValue: string;
  statusFilter: string;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  searchValue,
  statusFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointments = useAppSelector(selectAppointments);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [prescriptionInputs, setPrescriptionInputs] = useState([
    { medication: "", description: "" },
  ]);
  const [selectedUserDocId, setSelectedUserDocId] = useState<string | null>(
    null
  );
  const [messageApi, contextHolder] = message.useMessage();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    const checked = e.target.checked;
    const status = checked ? "visited" : "scheduled";
    dispatch(updateAppointmentStatus({ id, status }));
  };

  const handleAddPrescription = () => {
    setPrescriptionInputs([
      ...prescriptionInputs,
      { medication: "", description: "" },
    ]);
  };

  const handleRemovePrescription = (index: number) => {
    const updated = [...prescriptionInputs];
    updated.splice(index, 1);
    setPrescriptionInputs(updated);
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch = appointment.patientName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) =>
      dayjs.utc(a.startTime).isAfter(dayjs.utc(b.startTime)) ? 1 : -1
    );

  const showModal = (userDocId: string) => {
    setPrescriptionInputs([{ medication: "", description: "" }]);
    setSelectedUserDocId(userDocId);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!selectedUserDocId) return;

    try {
      for (const med of prescriptionInputs) {
        await dispatch(
          addMedication({
            patient_doc_id: selectedUserDocId,
            newMedication: {
              medication: med.medication,
              description: med.description,
            },
          })
        ).unwrap();
      }
      messageApi.open({
        type: "success",
        content: "Prescriptions sent successfully!",
      });

      setIsModalOpen(false);
    } catch {
      messageApi.open({
        type: "error",
        content: "Failed to send prescriptions.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="appointments-list-container">
        <div className="appointments-list-content">
          {status === "loading" ? (
            <div className="message-container">
              <div className="loading-message">Loading appointments...</div>
            </div>
          ) : status === "failed" ? (
            <div className="message-container">
              <div className="error-message">Error loading appointments</div>
            </div>
          ) : status === "succeeded" && filteredAppointments.length === 0 ? (
            <div className="message-container">
              <div className="no-results-message">No appointments found.</div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DATE AND TIME</th>
                  <th>REASON</th>
                  <th>NOTES</th>
                  <th>STATUS</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.doc_id}>
                    <td className="checkbox-name-cell">
                      <label className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="native-checkbox"
                          value={appointment.doc_id}
                          checked={appointment.status === "visited"}
                          onChange={handleCheckboxChange}
                        />
                        {appointment?.patientName}
                      </label>
                    </td>
                    <td>
                      {dayjs
                        .utc(appointment.startTime)
                        .local()
                        .format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.notes}</td>
                    <td>
                      <div className="appointment-status">
                        <div className="appointment-status-icon">
                          {appointment.status === "scheduled" ? (
                            <ScheduleTwoTone className="status-icon" />
                          ) : appointment.status === "visited" ? (
                            <CheckCircleTwoTone
                              className="status-icon"
                              twoToneColor="#52c41a"
                            />
                          ) : (
                            <CloseCircleTwoTone className="status-icon" />
                          )}
                        </div>
                        {appointment.status}
                      </div>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => showModal(appointment.patientId)}
                      >
                        Add prescription
                      </Button>
                      <Modal
                        className="transparent-modal"
                        closable={{ "aria-label": "Custom Close Button" }}
                        title="Prescription"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        {prescriptionInputs.map((input, index) => (
                          <div key={index} className="modal-inputs">
                            <Input
                              placeholder="Medication"
                              allowClear
                              className="medication-input"
                              value={input.medication}
                              onChange={(e) => {
                                const newInputs = [...prescriptionInputs];
                                newInputs[index].medication = e.target.value;
                                setPrescriptionInputs(newInputs);
                              }}
                            />
                            <TextArea
                              placeholder="How to take it"
                              rows={1}
                              allowClear
                              className="description-input"
                              value={input.description}
                              onChange={(e) => {
                                const newInputs = [...prescriptionInputs];
                                newInputs[index].description = e.target.value;
                                setPrescriptionInputs(newInputs);
                              }}
                            />
                            {index !== 0 && (
                              <Button
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemovePrescription(index)}
                                className="delete-prescription-btn"
                              />
                            )}
                          </div>
                        ))}
                        <Button
                          className="modal-add-btn"
                          onClick={handleAddPrescription}
                        >
                          <PlusOutlined />
                        </Button>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentsList;
