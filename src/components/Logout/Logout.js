import { useNavigate } from 'react-router-dom'
import logout from '../images/turn-off-icon.png'
function Logout() {
    const navigate = useNavigate()
    const userLogout = () => {
        localStorage.removeItem("jwt")
        
        navigate("/")
    }
    return <div className="dropdown"><img style={{width:"35px",position:"relative",left:"50rem"}} src={logout} alt="logout.png" onClick={() => userLogout()} /></div>
}
export default Logout