import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {useLocation, Link} from 'react-router-dom'
import Products from './Products';
import Categories from './Categories';
import Dashboard from './Dashboard';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    }),
}),
);

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
    }),
}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
display: 'flex',
alignItems: 'center',
padding: theme.spacing(0, 1),
// necessary for content to be below app bar
...theme.mixins.toolbar,
justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
const theme = useTheme();
const [open, setOpen] = React.useState(false);

const handleDrawerClose = () => {
    setOpen(false);
};

const handleDrawerOpen = () => {
    setOpen(true);
};

let pathName = useLocation().pathname;
console.log(pathName);

const getTitle = (pathName) =>{
    switch(pathName)
    {
        case '/': return 'E-commerce';
        case '/products': return 'Products';
        case '/dashboard': return 'Dashboard'
        case '/categories': return 'Categories'
    }
}

return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
            <p>{getTitle(pathName)}</p>
        </Typography>
        </Toolbar>
    </AppBar>
    <Drawer
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
        }}
        variant="persistent"
        anchor="left"
        open={open}
    >
        <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

            <ListItem component={Link} to="/dashboard" button key={"Dashboard"}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
            </ListItem>

            <ListItem component={Link} to="/categories" button key={"Categories"}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
            <ListItemText primary={"Categories"} />
            </ListItem>

            <ListItem component={Link} to="/products" button key={"Products"}>
                <ListItemIcon>
                    <ProductionQuantityLimitsIcon />
                </ListItemIcon>
            <ListItemText primary={"Products"} />
            </ListItem>
        </List>
        <Divider />
    </Drawer>
    <Main open={open}>
        <DrawerHeader />
        {props.children}
    </Main>
    </Box>
);
}
