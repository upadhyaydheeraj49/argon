import { Component } from 'react'
import Slider from 'react-slick'
import BookingSteps from '../BookingSteps'
import FeaturedVendorItem from '../FeaturedVendorItem'
import './index.css'

class LandingPage extends Component {
    state = {
        locationsList: [],
        featuredVendors: [{id: 1, name: "Arjun Kumar", photo: "https://360datagroup.com/wp-content/uploads/2023/01/avatar06.png", specialization: "Refrigerator", rating: "4.5", description: "Expert in diagnosing and fixing refrigerator issues.", location: "Mumbai"},
            {id: 1, name: "Arjun Kumar", photo: "https://360datagroup.com/wp-content/uploads/2023/01/avatar06.png", specialization: "Refrigerator", rating: "4.5", description: "Expert in diagnosing and fixing refrigerator issues.", location: "Mumbai"},
            {id: 1, name: "Arjun Kumar", photo: "https://360datagroup.com/wp-content/uploads/2023/01/avatar06.png", specialization: "Refrigerator", rating: "4.5", description: "Expert in diagnosing and fixing refrigerator issues.", location: "Mumbai"},
            {id: 1, name: "Arjun Kumar", photo: "https://360datagroup.com/wp-content/uploads/2023/01/avatar06.png", specialization: "Refrigerator", rating: "4.5", description: "Expert in diagnosing and fixing refrigerator issues.", location: "Mumbai"},
            {id: 1, name: "Arjun Kumar", photo: "https://360datagroup.com/wp-content/uploads/2023/01/avatar06.png", specialization: "Refrigerator", rating: "4.5", description: "Expert in diagnosing and fixing refrigerator issues.", location: "Mumbai"}
        ]
    }

    componentDidMount() {
        this.getLocations()
    }

    getLocations = async () => {
        const response = await fetch("http://localhost:8080/locations/", {mode: 'no-cors'})
        console.log(response)
        const locationList = await response.json();
        console.log(locationList)
        if(response.ok === true) {
            const locationList = await response.json();
            console.log(locationList)
        }
        else {
            console.log("Some error occurred")
        }
        
    }

    render() {
        const {locationsList, featuredVendors} = this.state
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        return (
        <div className="landing-page">
            <nav className="navbar">
                <img src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733849561/e57df5f03ddceb5a4011eb1efd953170_wqdhvc.png" alt="website logo" className="nav-logo" />
                <div>
                    <button className='btn btn-light-outline'>Biz Login</button>
                    <button className='btn btn-orange'>Login</button>
                </div>
            </nav>
            <div className='landing-page-top-container'>
                <div className='top-container-details'>
                    <h2>Take care of your home needs now!</h2>
                    <p>ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a technician.</p>
                    <select>
                        {

                        }
                    </select>
                </div>
            </div>
            <BookingSteps />
            <div className='featured-vendor-section'>
                <h2>Featured Vendors</h2>
                <Slider {...settings}>
                    {
                        featuredVendors.map(vendor => <FeaturedVendorItem key={vendor.id} vendorDetails={vendor} />)
                    }
                </Slider>
            </div>
        </div>
    )
    }
}
export default LandingPage
