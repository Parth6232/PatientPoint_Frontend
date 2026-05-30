import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Snackbar,
  Paper,
} from '@mui/material';
import { authApiAction } from 'store/apiSlices/auth/authApiSlice';
import Text from '@components/common/Text';
import { localStore } from 'store/localStore';

const AppointmentComponent = () => {
  const [addAppointment] = authApiAction.addAppointment();
  const role = localStore.getRole();

  const { data: getPatientListData } = authApiAction.getPatientList();
  const { data: getDoctortListData } = authApiAction.getDoctortList();
  const { data: getAppointmentListData, refetch } = authApiAction.getAppointmentList();

  const initialFormState = {
    disease: '',
    doctor: '',
    patient: '',
    date: '',
    time: '',
    createdBy: 'Admin',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [openModal, setOpenModal] = useState(false);
  const [successStatus, setSuccessStatus] = useState({ message: '', isOpen: false });

  const patientList = getPatientListData?.map((item) => ({
    label: item.name,
    value: item?._id,
  }));

  const doctorList = getDoctortListData
    ?.filter((itme) => itme?.specialization === formData?.disease)
    .map((item) => ({
      label: item.name,
      value: item?._id,
      disease: item?.specialization,
    }));

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const response = await addAppointment(formData);
      if (response.data.msg === 'Appointment added successfully') {
        setOpenModal(false);
        setFormData(initialFormState);
        setSuccessStatus({ message: response.data.msg, isOpen: true });
        refetch();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed!');
    }
  };

  return (
    <Box p={{ xs: 2, sm: 3, md: 4 }}>
      <Typography variant="h4" mb={3}>
        {role === 'Doctor' ? 'Today Appointments' : 'Appointments'}
      </Typography>

      {role !== 'Doctor' && (
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
          Add Appointment
        </Button>
      )}

      {/* Table wrapper for responsive scrolling */}
      <Paper sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E8F5E9' }}>
              <TableCell>Doctor</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAppointmentListData?.appointments?.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.doctor.name}</TableCell>
                <TableCell>{app.patient.name}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>{app.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Appointment Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" mb={2}>
            Add Appointment
          </Typography>

          <Text>Select disease</Text>
          <TextField
            select
            label="Disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {getDoctortListData?.map((doc) => (
              <MenuItem key={doc.specialization} value={doc.specialization}>
                {doc.specialization}
              </MenuItem>
            ))}
          </TextField>

          <Text>Select Doctor</Text>
          <TextField
            select
            label="Doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {doctorList?.map((doc) => (
              <MenuItem key={doc.value} value={doc.value}>
                {doc.label}
              </MenuItem>
            ))}
          </TextField>

          <Text>Select Patient</Text>
          <TextField
            select
            label="Patient"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {patientList?.map((pat) => (
              <MenuItem key={pat.value} value={pat.value}>
                {pat.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={successStatus?.isOpen}
        autoHideDuration={5000}
        message={successStatus.message}
        onClose={() => setSuccessStatus({ ...successStatus, isOpen: false })}
      />
    </Box>
  );
};

export default AppointmentComponent;
