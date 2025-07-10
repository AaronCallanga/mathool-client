import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <>
        <AppBar sx={{backgroundColor: "#313638"}}>
            <Toolbar sx={{display: "flex", justifyContent:"space-between"}}>
                <Typography variant="h6"> 
                    Matho.oL
                </Typography>
                <Typography variant="subtitle1"> 
                    By: Aaron Dave D. Callanga
                </Typography>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Header;