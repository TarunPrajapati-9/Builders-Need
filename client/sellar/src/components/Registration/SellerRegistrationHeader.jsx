import React from 'react'
import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, Container, useScrollTrigger } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront'

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'background.paper' : 'transparent',
      color: trigger ? 'text.primary' : 'text.primary',
      transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
    },
  })
}

export default function SellerRegistrationHeader() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        color="inherit"
        sx={{
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 64 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StorefrontIcon
                sx={{
                  display: 'flex',
                  mr: 1,
                  color: 'primary.main',
                  fontSize: 32,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                }}
              >
                Seller Registration
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  )
}