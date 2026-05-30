import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { authApiAction } from 'store/apiSlices/auth/authApiSlice';

export default function PatientsComponent() {
  const { data: getPatientListData, refetch } = authApiAction.getPatientList();
  const [search, setSearch] = useState('');

  // Modal state
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
  });

  // API mutation for adding patient
  const [addPatient] = authApiAction.register();

  const filteredPatients = getPatientListData?.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      (p.email && p.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await addPatient({ ...newPatient, role: 'Patient' }).unwrap();
      setOpen(false);
      setNewPatient({ name: '', age: '', gender: '', email: '', phone: '', password: '' });
      refetch();
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 3, gap: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Patients List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          + Add Patient
        </Button>
      </Box>

      {/* Search Field */}
      <TextField
        label="Search Patients"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2, maxWidth: { xs: '100%', sm: '450px', md: '600px' } }}
      />

      {/* Patients Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, overflowX: 'auto' }}>
        <CardContent>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E8F5E9' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients?.map((p) => (
                <TableRow key={p.id} hover sx={{ '&:hover': { backgroundColor: '#e0f7fa' } }}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.gender}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                </TableRow>
              ))}
              {filteredPatients?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Patient Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" value={newPatient.name} onChange={handleChange} fullWidth />
          <TextField label="Age" name="age" type="number" value={newPatient.age} onChange={handleChange} fullWidth />
          <TextField select label="Gender" name="gender" value={newPatient.gender} onChange={handleChange} fullWidth>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField label="Email" name="email" type="email" value={newPatient.email} onChange={handleChange} fullWidth />
          <TextField label="Phone" name="phone" value={newPatient.phone} onChange={handleChange} fullWidth />
          <TextField label="Password" name="password" type="password" value={newPatient.password} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
