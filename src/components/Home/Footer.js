import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="pt-5" style={{ marginTop: "7rem" }}>
      <footer className=" text-light text-center py-2" style={{ backgroundColor: "#5861ae", height: "10vh" }}>
        <div className="col-md-12 ">
          <p style={{ color: "#FFF" }}>&copy; 2023 custome.com All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
export default Footer