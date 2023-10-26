import Headers from "../Headers/Headers"
import Sidebar from "../Sidebar/Sidebar"


function Welcome() {
    const getName = () => {
        const userDetails = JSON.parse(localStorage.getItem("user"))
        return userDetails.name
    }
    return <div className="mb-3">
        <div className="">
            <Headers />
        </div>
        <div className='d-flex'>
            <div className='col-auto' style={{ position: "absolute" }}>
                <Sidebar />
            </div>
        </div>
        <div>
            <div style={{ margin: "4% 20%", color: "#5861AE" }}>
                <div><h5> Hello <span className='username'>{getName()}</span>, WelCome to CRM Solution </h5></div>
            </div>
        </div>
        <div className="mt-4" style={{position:"relative",top:"15rem",color:"#FFF"}}>

        </div>
    </div>
}
export default Welcome