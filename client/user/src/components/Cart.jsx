// import {
//   Drawer,
//   Box,
//   Typography,
//   IconButton,
//   Divider,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   ButtonGroup,
//   Slide
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { styled } from '@mui/material/styles';

// const CartDrawer = styled(Drawer)(({ theme }) => ({
//   '& .MuiDrawer-paper': {
//     width: {
//       xs: '100%',
//       sm: 400,
//     },
//     padding: theme.spacing(2),
//   },
// }));

// const CartItemWrapper = styled(ListItem)(({ theme }) => ({
//   padding: theme.spacing(2, 0),
//   '&:not(:last-child)': {
//     borderBottom: `1px solid ${theme.palette.divider}`,
//   },
// }));

// const CartFooter = styled(Box)(({ theme }) => ({
//   position: 'sticky',
//   bottom: 0,
//   backgroundColor: theme.palette.background.paper,
//   padding: theme.spacing(2, 0),
//   borderTop: `1px solid ${theme.palette.divider}`,
// }));

// const EmptyCartContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: theme.spacing(4),
//   height: '50vh',
//   textAlign: 'center',
// }));

// const Cart = () => {

//   const handleClose = () => {
//     // setCartOpen(false);
//   };

//   const handleRemoveItem = (productId) => {
//     // removeFromCart(productId);
//   };

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     // updateQuantity(productId, newQuantity);
//   };

//   const formatPrice = (price) => {
//     return price.toFixed(2);
//   };

//   const renderEmptyCart = () => (
//     <EmptyCartContainer>
//       <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
//       <Typography variant="h5" gutterBottom>
//         Your cart is empty
//       </Typography>
//       <Typography variant="body2" color="text.secondary" paragraph>
//         Looks like you haven't added any products to your cart yet.
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleClose}
//         sx={{ mt: 2 }}
//       >
//         Continue Shopping
//       </Button>
//     </EmptyCartContainer>
//   );

//   const renderCartItems = () => (
//     <>
//       <List disablePadding>
//         {cartItems.map((item) => {
//           const { id, name, price, quantity, image, discount } = item;
//           const discountedPrice = discount
//             ? price * (1 - discount / 100)
//             : price;

//           return (
//             <Slide direction="right" in={true} key={id} mountOnEnter unmountOnExit>
//               <CartItemWrapper>
//                 <ListItemAvatar>
//                   <Avatar
//                     alt={name}
//                     src={image}
//                     variant="rounded"
//                     sx={{ width: 60, height: 60, mr: 2 }}
//                   />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={
//                     <Typography variant="body1" fontWeight={500}>
//                       {name}
//                     </Typography>
//                   }
//                   secondary={
//                     <Box sx={{ mt: 1 }}>
//                       {discount > 0 ? (
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Typography variant="body2" color="primary" fontWeight={500}>
//                             ${formatPrice(discountedPrice)}
//                           </Typography>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             sx={{ ml: 1, textDecoration: 'line-through' }}
//                           >
//                             ${formatPrice(price)}
//                           </Typography>
//                         </Box>
//                       ) : (
//                         <Typography variant="body2" color="primary" fontWeight={500}>
//                           ${formatPrice(price)}
//                         </Typography>
//                       )}
//                     </Box>
//                   }
//                   sx={{ mr: 2 }}
//                 />
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                   <ButtonGroup size="small" aria-label="quantity controls">
//                     <Button
//                       onClick={() => handleUpdateQuantity(id, quantity - 1)}
//                       disabled={quantity <= 1}
//                     >
//                       <RemoveIcon fontSize="small" />
//                     </Button>
//                     <Button disabled sx={{ px: 2 }}>
//                       {quantity}
//                     </Button>
//                     <Button
//                       onClick={() => handleUpdateQuantity(id, quantity + 1)}
//                     >
//                       <AddIcon fontSize="small" />
//                     </Button>
//                   </ButtonGroup>
//                   <IconButton
//                     onClick={() => handleRemoveItem(id)}
//                     color="error"
//                     size="small"
//                     sx={{ mt: 1 }}
//                   >
//                     <DeleteOutlineIcon fontSize="small" />
//                   </IconButton>
//                 </Box>
//               </CartItemWrapper>
//             </Slide>
//           );
//         })}
//       </List>

//       <CartFooter>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography variant="body1">Subtotal</Typography>
//           <Typography variant="body1" fontWeight={500}>
//             ${formatPrice(getCartTotal())}
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography variant="body2" color="text.secondary">
//             Shipping
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Calculated at checkout
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           size="large"
//           sx={{ mb: 1 }}
//         >
//           Checkout
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           fullWidth
//           onClick={clearCart}
//         >
//           Clear Cart
//         </Button>
//       </CartFooter>
//     </>
//   );

//   return (
//     <CartDrawer
//       anchor="right"
//       open={cartOpen}
//       onClose={handleClose}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h6" component="div">
//           Shopping Cart ({cartItems.length})
//         </Typography>
//         <IconButton onClick={handleClose} edge="end">
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       <Divider sx={{ mb: 2 }} />

//       {cartItems.length === 0 ? renderEmptyCart() : renderCartItems()}
//     </CartDrawer>
//   );
// };

// export default Cart;
