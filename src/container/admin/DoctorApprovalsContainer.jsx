import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { authApiAction } from 'store/apiSlices/auth/authApiSlice';
import toast, { Toaster } from 'react-hot-toast';

const DoctorApprovalsContainer = () => {
  const { data: doctorList, isLoading, refetch } = authApiAction.getDoctortList();
  const [approveDoctor, { isLoading: isApproving }] = authApiAction.approveDoctor();
  const [rejectDoctor, { isLoading: isRejecting }] = authApiAction.rejectDoctor();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [actionType, setActionType] = useState(''); // 'Approve' or 'Reject'

  const handleOpenDialog = (doctor, type) => {
    setSelectedDoctor(doctor);
    setActionType(type);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDoctor(null);
    setActionType('');
  };

  const handleConfirmAction = async () => {
    if (!selectedDoctor) return;
    
    try {
      if (actionType === 'Approve') {
        await approveDoctor(selectedDoctor._id).unwrap();
        toast.success(`Doctor ${selectedDoctor.name} approved successfully`);
      } else {
        await rejectDoctor(selectedDoctor._id).unwrap();
        toast.success(`Doctor ${selectedDoctor.name} rejected successfully`);
      }
      refetch();
    } catch (error) {
      toast.error(`Failed to ${actionType.toLowerCase()} doctor`);
    } finally {
      handleCloseDialog();
    }
  };

  const columns = [
    { field: 'name', headerName: 'Doctor Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 150 },
    { field: 'specialization', headerName: 'Specialization', flex: 1, minWidth: 150 },
    { 
      field: 'createdAt', 
      headerName: 'Registration Date', 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : 'N/A';
      }
    },
    { 
      field: 'approvalStatus', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => {
        let color = 'default';
        if (params.value === 'Approved') color = 'success';
        if (params.value === 'Pending') color = 'warning';
        if (params.value === 'Rejected') color = 'error';
        return <Chip label={params.value || 'N/A'} color={color} size="small" />;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => {
        if (params.row.approvalStatus !== 'Pending') {
          return null;
        }
        return (
          <Box display="flex" gap={1} height="100%" alignItems="center">
            <Button 
              variant="contained" 
              color="success" 
              size="small" 
              onClick={() => handleOpenDialog(params.row, 'Approve')}
              disabled={isApproving || isRejecting}
              sx={{ textTransform: 'none', borderRadius: '8px' }}
            >
              Approve
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              size="small" 
              onClick={() => handleOpenDialog(params.row, 'Reject')}
              disabled={isApproving || isRejecting}
              sx={{ textTransform: 'none', borderRadius: '8px' }}
            >
              Reject
            </Button>
          </Box>
        );
      }
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Toaster position="top-center" />
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" fontFamily="Manrope" color="#262626">
          Doctor Approvals
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" fontFamily="Manrope">
          Manage pending doctor registrations
        </Typography>
      </Box>

      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
        <CardContent>
          <DataGrid
            rows={doctorList || []}
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                fontFamily: 'Manrope',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                fontFamily: 'Manrope',
              }
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontFamily: 'Manrope', fontWeight: 'bold' }}>
          Confirm {actionType}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Manrope' }}>
            Are you sure you want to {actionType?.toLowerCase()} the registration for Dr. {selectedDoctor?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit" sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            color={actionType === 'Approve' ? 'success' : 'error'} 
            variant="contained"
            disabled={isApproving || isRejecting}
            sx={{ textTransform: 'none' }}
          >
            Yes, {actionType}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorApprovalsContainer;
