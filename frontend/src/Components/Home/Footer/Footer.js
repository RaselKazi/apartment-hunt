import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="row p-5 bg-footer">
            <div className="col-md-5 d-flex">
                <big><p><FontAwesomeIcon className="text-white mx-1" icon={faMapMarker} /></p></big>
                <p className="text-white ml-1">H#340 (4th Floor), Road #24,<br />
                    New DOHS, Mohakhali, Dhaka, Bangladesh<br />
                    Phone: 018XXXXXXXX<br />
                    E-mail: info@company.com</p>
            </div>
            <div className="col-md-2">
                <big><Link to="#" className="text-white d-block text-decoration-none pb-3">Company</Link></big>
                <Link to="#" className="text-white d-block text-decoration-none">About</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Site Map</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Support Center</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Terms Conditions</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Submit Listing</Link>
            </div>
            <div className="col-md-2">
                <big><Link to="#" className="text-white d-block text-decoration-none pb-3">Quick Links</Link></big>
                <Link to="#" className="text-white d-block text-decoration-none">Quick Links</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Rentals</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Sales</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Contact</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Terms Conditions</Link>
                <Link to="#" className="text-white d-block text-decoration-none">Our blog</Link>
            </div>
            <div className="col-md-2">
                <big><Link to="#" className="text-white d-block text-decoration-none pb-3">About us</Link></big>
                <p className="text-white">We are the top real estate<br />
                agency in Sydney, with agents<br />
                available to answer any<br />
                question 24/7.</p>
                <a href="#"><FontAwesomeIcon className="text-white mx-1" icon={faLinkedin} /></a>
                <a href="#"><FontAwesomeIcon className="text-white mx-1" icon={faFacebookSquare} /></a>
                <a href="#"><FontAwesomeIcon className="text-white mx-1" icon={faInstagramSquare} /></a>
                <a href="#"><FontAwesomeIcon className="text-white mx-1" icon={faTwitterSquare} /></a>
                <a href="#"><FontAwesomeIcon className="text-white mx-1" icon={faYoutubeSquare} /></a>
            </div>
        </div>
    );
};

export default Footer;