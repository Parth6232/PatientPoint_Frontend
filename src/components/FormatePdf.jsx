import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ModalCommon from './common/ModalCommon';
import Button from './common/Button';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';



const FormatePdf = ({ formData = {}, isModalOpen, handleClose }) => {
     const theme = useTheme();
  
      const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Hotel-Form-${formData.fullName || 'Guest'}.pdf`);
    handleClose();
  };

  return (
    <ModalCommon
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      width={isMobile?"95%":'50%'}
      padding={1}
      showIcon={false}
    >
      <div style={{ overflowX: 'auto' }}>
        <div
          ref={printRef}
          style={{
            maxWidth: '850px',
            margin: 'auto',
            padding: '16px',
            backgroundColor: '#fff',
            fontSize: '10px',
            fontFamily: 'Arial, sans-serif',
            color: '#000',
            border: '1px solid #ddd',
            lineHeight: '1.4',
          }}
        >
           <img
            src="/assest/logo.png"
            alt="logo"
            style={{ objectFit: 'cover', width: '241px', height: '85px'}}
          />
          <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>
            Medi Route REGISTRATION FORM
          </h2>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '10px',
            }}
            border="1"
          >
            <tbody>
              <tr>
                <td><strong>Entry Reg. No.</strong></td>
                <td>{formData.entryNo}</td>
                <td><strong>Number of Persons</strong></td>
                <td>{formData.persons}</td>
              </tr>
              <tr>
                <td><strong>Full Name</strong></td>
                <td colSpan="3">{formData.fullName}</td>
              </tr>
              <tr>
                <td><strong>Full Address</strong></td>
                <td colSpan="3">{formData.address}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>{formData.country}</td>
                <td><strong>City</strong></td>
                <td>{formData.city}</td>
              </tr>
              <tr>
                <td><strong>Document Type</strong></td>
                <td>{formData.documentType}</td>
                <td><strong>Cell Phone</strong></td>
                <td>{formData.phone}</td>
              </tr>
              <tr>
                <td><strong>Document Numbers</strong></td>
                <td colSpan="3">{formData.documentNumbers}</td>
              </tr>
              <tr>
                <td><strong>Date of Arrival</strong></td>
                <td>{formData.arrivalDate}</td>
                <td><strong>Time of Arrival</strong></td>
                <td>{formData.arrivalTime}</td>
              </tr>
              <tr>
                <td><strong>Date of Departure</strong></td>
                <td>{formData.departureDate}</td>
                <td><strong>Time of Departure</strong></td>
                <td>{formData.departureTime}</td>
              </tr>
              <tr>
                <td><strong>Purpose of Visit</strong></td>
                <td>{formData.purpose}</td>
                <td><strong>Mode of Travel</strong></td>
                <td>{formData.travelMode}</td>
              </tr>
              <tr>
                <td><strong>Room No.</strong></td>
                <td>{formData.roomNumber}</td>
                <td><strong>Vehicle Number</strong></td>
                <td>{formData.vehicleNumber}</td>
              </tr>
              <tr>
                <td><strong>Coming From</strong></td>
                <td>{formData.comingFrom}</td>
                <td><strong>Going To</strong></td>
                <td>{formData.goingTo}</td>
              </tr>
              <tr>
                <td><strong>Date</strong></td>
                <td>{formData.date}</td>
                <td colSpan="2" style={{ textAlign: 'right' }}>
                  <strong>Signature:</strong> __________________
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ fontSize: '9px', paddingTop: '6px' }}>
            <p>
              <strong>Note:</strong> Early check-in or late check-out is subject
              to availability and reconfirmation. Cancellation or no-show will
              be charged the first night’s stay.
            </p>
            <p>
              <strong>Hotel Address:</strong> Main Road, Near Jain Temple,
              Orchha, Dist. Niwari (M.P.)<br />
              <strong>Contact:</strong> 9685293105, 8962321624
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <Button onClick={handleDownloadPdf} btnName="Download PDF" />
        </div>
      </div>
    </ModalCommon>
  );
};

export default FormatePdf;
