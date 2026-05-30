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

export default function DoctorComponent() {
  const { data: getDoctortListData, refetch } = authApiAction.getDoctortList();
  const [addDoctor] = authApiAction.register();

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Doctor',
    specialization: '',
    gender: '',
    phone: '',
  });

  const specializations = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Oncologist',
    'Pediatrician',
    'Psychiatrist',
  ];

  const genders = ['Male', 'Female', 'Other'];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addDoctor({ ...newDoctor, role: 'Doctor' }).unwrap();
      setOpen(false);
      setNewDoctor({
        name: '',
        email: '',
        password: '',
        role: 'Doctor',
        specialization: '',
        gender: '',
        phone: '',
      });
      refetch();
    } catch (error) {
      console.error('Failed to add doctor:', error);
    }
  };

  const filteredDoctors = getDoctortListData?.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Doctors List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Doctor
        </Button>
      </Box>

      {/* Search Field */}
      <TextField
        label="Search Doctors"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2, maxWidth: { xs: '100%', sm: '400px', md: '600px' } }}
      />

      {/* Doctors Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, overflowX: 'auto' }}>
        <CardContent>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Specialization</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDoctors?.map((d) => (
                <TableRow
                  key={d.id}
                  hover
                  sx={{ '&:hover': { backgroundColor: '#e0f7fa' } }}
                >
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.specialization}</TableCell>
                  <TableCell>{d.email}</TableCell>
                  <TableCell>{d.phone}</TableCell>
                </TableRow>
              ))}
              {filteredDoctors?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No doctors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Doctor Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField label="Name" name="name" value={newDoctor.name} onChange={handleChange} fullWidth />
          <TextField label="Email" name="email" type="email" value={newDoctor.email} onChange={handleChange} fullWidth />
          <TextField label="Password" name="password" type="password" value={newDoctor.password} onChange={handleChange} fullWidth />
          <TextField label="Specialization" name="specialization" select value={newDoctor.specialization} onChange={handleChange} fullWidth>
            {specializations.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <TextField label="Gender" name="gender" select value={newDoctor.gender} onChange={handleChange} fullWidth>
            {genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
          </TextField>
          <TextField label="Phone" name="phone" value={newDoctor.phone} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
