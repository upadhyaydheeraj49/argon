import "./index.css"

const BookingSteps = () => {
    return (
        <div className="booking-steps-section">
            <h2 className="booking-section-heading">Book a request in 3 simple steps</h2>
            <div className="booking-step-cards-container">
                <div className="booking-step-card">
                    <img src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733855889/step1.png" alt="card image" />
                    <h4>Provide your appliance details</h4>
                    <p>Let us know your appliance details and your issue.</p>
                </div>
                <div className="booking-step-card">
                    <img src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733855889/step2.png" alt="card image" />
                    <h4>Choose your technician</h4>
                    <p>Choose from a wide variety of technicians and vendors.</p>
                </div>
                <div className="booking-step-card">
                    <img src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733855889/step3.png" alt="card image" />
                    <h4>Get it fixed!</h4>
                    <p>The technician will arrive at your doorstep shortly to fix it!</p>
                </div>
            </div>
        </div>
    )
}
export default BookingSteps
