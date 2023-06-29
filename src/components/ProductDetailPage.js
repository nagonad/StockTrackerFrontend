import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  Box,
} from "@mui/material";

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [error, setError] = useState(null);
  const { id, color, size } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/stockInfo/product/${id}`);
          setProduct(response.data);

          const variant = response.data.variants.find(
            (v) => v.color === color && v.size === size
          );

          if (variant) {
            setSelectedVariant(variant);
          } else {
            setError("Variant not found");
          }
        } catch (error) {
          console.error("Failed to fetch product", error);
          setError("Failed to fetch product");
        }
      }
    }

    fetchProduct();
  }, [id, color, size]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        {product.name} - {selectedVariant.color} ({selectedVariant.size})
      </Typography>

      <Box display="flex" alignItems="center" mb={4}>
        <Grid container spacing={4}>
          {/* Render images */}
          <Grid item xs={12} sm={6}>
            <CardMedia component="img" height="300" image={selectedVariant.imageUrl} />
          </Grid>

          {/* Render variant details */}
          <Grid item xs={12} sm={6}>
            <Box p={2} bgcolor="#F8F8F8" borderRadius={4}>
              <Typography variant="h6">Color: {selectedVariant.color}</Typography>
              <Typography variant="h6">Size: {selectedVariant.size}</Typography>
              <Typography variant="h6">Price: ${selectedVariant.price}</Typography>
              {/* Add additional variant details here */}
              <Typography variant="h6">Technical Specifications:</Typography>
              <Typography>{selectedVariant.technicalSpecifications}</Typography>
              <Typography variant="h6">Features:</Typography>
              <Typography>{selectedVariant.features}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6" gutterBottom>
        Other Variants:
      </Typography>
      <Grid container spacing={2}>
        {product.variants.map((variant) => (
          <Grid item key={variant._id}>
            <Button onClick={() => setSelectedVariant(variant)}>
              <Card>
                <CardContent>
                  <Typography variant="body2">
                    {variant.color} ({variant.size})
                  </Typography>
                  <CardMedia
                    component="img"
                    height="100"
                    image={variant.imageUrl}
                  />
                </CardContent>
              </Card>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductDetailPage;
