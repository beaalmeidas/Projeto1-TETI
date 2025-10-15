import { Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login"
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


function Login() {
    return (
        <Box>
            <Paper>
                <Box>
                    <LoginIcon />
                    <Typography>Bem-vindo</Typography>
                    <Typography>Realize seu login abaixo:</Typography>
                </Box>
                <Box>
                    <TextField label="Email" />
                    <TextField label="Senha" />
                    <Button>Entrar</Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;