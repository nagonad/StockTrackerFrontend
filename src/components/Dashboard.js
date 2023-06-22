import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid,  Box, TextField, Typography } from '@material-ui/core';
import { Euro as EuroIcon, ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';

export default function Dashboard() {
  const [stockInfo, setStockInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/stockinfo');
        console.log(response);
        if (!Array.isArray(response.data)) {
          console.error('Data from server is not an array:', response.data);
        } else {
          setStockInfo(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch stockInfo', error);
      }  
    };
  
    fetchStockInfo();
  }, []);

  const totalValue = stockInfo.reduce((total, item) => total + item.totalPrice, 0);
  const outOfStockCount = stockInfo.filter(item => item.quantity === 0).length;
  const categories = [...new Set(stockInfo.map(item => item.category))].length;

  return (
    <Box m={8}> 
      <Grid container spacing={3}>
        <Grid item xs={12}> 
          <Box display="flex" justifyContent="center" mb={2}> 
            <Button variant="outlined" color="secondary" startIcon={<ShoppingCartIcon />} style={{ marginRight: 10,  padding: '20px 30px'}} size="large">
              <Typography variant="h6">Total Products: {stockInfo.length}</Typography>
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<EuroIcon />} style={{ marginRight: 10, padding: '20px 30px' }} size="large">
              <Typography variant="h6">Total Value: {totalValue}</Typography>
            </Button>
            <Button variant="outlined" color="secondary" style={{ marginRight: 10,  padding: '20px 30px'}} size="large">
              <Typography variant="h6">Out of Stock: {outOfStockCount}</Typography>
            </Button>
            <Button variant="outlined" color="secondary" style={{  marginRight: 10, padding: '20px 30px' }} size="large">
              <Typography variant="h6">Categories: {categories}</Typography>
            </Button>
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} InputLabelProps={{ style: { fontSize: 20 } }} inputProps={{ style: { fontSize: 20 } }} />
          </Box>

          <TableContainer component={Paper} style={{ maxWidth: '80%', margin: 'auto', backgroundColor: '#f5f5f5' }}>
  <Table style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
    <TableHead>
      <TableRow>
        <TableCell align="left" style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f51b5', borderBottom: '2px solid #9e9e9e' }}>Name</TableCell>
        <TableCell align="center" style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f51b5', borderBottom: '2px solid #9e9e9e' }}>Image</TableCell>
        <TableCell align="center" style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f51b5', borderBottom: '2px solid #9e9e9e' }}>Category</TableCell>
        <TableCell align="center" style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f51b5', borderBottom: '2px solid #9e9e9e' }}>Quantity</TableCell>
        <TableCell align="center" style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f51b5', borderBottom: '2px solid #9e9e9e' }}>Price</TableCell>
        <TableCell align="center" style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f51b5', borderBottom: '2px solid #9e9e9e' }}>Total Price</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {stockInfo.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
        <TableRow key={item.id} style={{ backgroundColor: '#fafafa', borderRadius: '5px', margin: '10px 0' }}>
          <TableCell component="th" scope="row" style={{ fontSize: '18px', color: '#616161' }}>
            {item.name}
          </TableCell>
          <TableCell align="center"><img src={item.imageUrl} alt="Product" style={{width: "75px", height: "100px"}} /></TableCell>
          <TableCell align="center" style={{ fontSize: '18px', color: '#616161' }}>{item.category}</TableCell>
          <TableCell align="center" style={{ fontSize: '18px', color: '#616161' }}>{item.quantity}</TableCell>
          <TableCell align="center" style={{ fontSize: '18px', color: '#616161' }}>{item.price}</TableCell>
          <TableCell align="center" style={{ fontSize: '18px', color: '#616161' }}>{item.totalPrice}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        </Grid>
      </Grid>
    </Box>
  );
}
