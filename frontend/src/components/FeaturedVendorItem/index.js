import "./index.css"

const FeaturedVendorItem = props => {
    const {vendorDetails} = props
    const {name, photo, rating, specialization} = vendorDetails
    const services = specialization.split(",").length
    return (
        <div className="vendor-card">
            <img src={photo} alt="vendor photo" className="vendor-profile-photo" />
            <p className="vendor-name">{name}</p>
        </div>
    )
}
export default FeaturedVendorItem
