import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

function ProductDetailPage({ themeMode }) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id, color, size } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          const response = await axios.get(
            `https://stocktrackerbackend.onrender.com/stockInfo/product/${id}`
          );
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

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % selectedVariant.images.length
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedVariant.images.length) %
        selectedVariant.images.length
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#333", fontFamily: "Arial" }}>
        {product.name}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Images */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ position: "relative", textAlign: "center" }}>
              <IconButton
              onClick={handlePreviousImage}
              sx={{
                position: "absolute",
                left: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                "@media (max-width: 600px)": {
                  left: "-20px",
                },
                "@media (min-width: 601px) and (max-width: 1024px)": {
                  left: "-30px",
                },
              }}
            >
              <NavigateBefore />
            </IconButton>
            <CardMedia
              component="img"
              height="300"
              image={selectedVariant.images[currentImageIndex]}
              sx={{
                borderRadius: "8px",
                objectFit: "cover",
                maxWidth: "70%",  
                width: "auto", 
                height: "auto", 
              }}
            />
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                right: "100px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                "@media (max-width: 600px)": {
                  right: "40px",
                },
                "@media (min-width: 696px) and (max-width: 1080px)": {
                  right: "40px",
                },
              }}
            >
              <NavigateNext />
            </IconButton>



              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555", fontFamily: "Arial" }}>
                Other Variants:
              </Typography>
              <Grid container spacing={2}>
                {product.variants.map((variant) => (
                  <Grid item key={variant._id}>
                    <Button
                      sx={{
                        transition: "all 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <Card
                        sx={{
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <CardContent>
                          <Typography variant="body2" sx={{ textAlign: "center", fontFamily: "Arial" }}>
                            {variant.color} ({variant.size})
                          </Typography>
                          <CardMedia
                            component="img"
                            height="100"
                            image={variant.images[0]}
                            sx={{ borderRadius: "8px", objectFit: "contain" }}
                          />
                        </CardContent>
                      </Card>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>


          {/* Render variant details */}
          <Grid item xs={12} sm={6}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: "#F8F8F8",
          borderRadius: "8px",
          width: "100%", 
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#444", marginBottom: 1 }}
        >
          Color: {selectedVariant.color}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Size: {selectedVariant.size}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Description: {selectedVariant.description}
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: "#F8F8F8",
          borderRadius: "8px",
          width: "100%", 
        }}
      >
        <Typography
          variant="h6"
          className={`createProductBox ${themeMode}`}
          sx={{ marginBottom: 1 }}
        >
          Technical Specifications:
        </Typography>
        {Array.isArray(selectedVariant.technicalSpecifications) ? (
          <List>
            {selectedVariant.technicalSpecifications.map((spec, index) => (
              <ListItem key={index}>{spec}</ListItem>
            ))}
          </List>
        ) : (
          <Typography>{selectedVariant.technicalSpecifications}</Typography>
        )}
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Features:
        </Typography>
        {Array.isArray(selectedVariant.features) ? (
          <List>
            {selectedVariant.features.map((feature, index) => (
              <ListItem key={index}>{feature}</ListItem>
            ))}
          </List>
        ) : (
          <Typography>{selectedVariant.features}</Typography>
        )}
      </Paper>
    </Grid>
  </Grid>
</Grid>

        </Grid>

    </Container>
  );
}

export default ProductDetailPage;
