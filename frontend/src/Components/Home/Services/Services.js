import React from 'react';
import apartment_1 from '../../../assets/logos/apartment_1.png';
import affordable_1 from '../../../assets/logos/affordable_1.png';
import lessee_1 from '../../../assets/logos/lessee_1.png';


const Services = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h6>Service</h6>
                <h2>We're an agency tailored to all <br/> clients' needs that always delivers</h2>
            </div>
            <div className="row m-5">
                <div className="col-md-4 p-3 text-center">
                    <img style={{ height: '50px' }} src={apartment_1} alt="img" />
                    <h4 className="mt-3 mb-3">Wide Range of Properties</h4>
                    <p className="text-secondary">With a robust selection of popular properties on hand, as well as leading properties fro my-5m experts.</p>
                </div>
                <div className="col-md-4 p-3 text-center">
                    <img style={{ height: '50px' }} src={affordable_1} alt="img" />
                    <h4 className="mt-3 mb-3">Financing Made Easy</h4>
                    <p className="text-secondary">Our stress-free finance department that can find financial solutions to save  my-5you money.</p>
                </div>
                <div className="col-md-4 p-3 text-center">
                    <img style={{ height: '50px' }} src={lessee_1} alt="img" />
                    <h4 className="mt-3 mb-3">Trusted by Thousands</h4>
                    <p className="text-secondary">10 new offers every day. 350 offers on site, trusted by a community of thousands my-5 of users.</p>
                </div>
            </div >
        </div>
    );
};

export default Services;