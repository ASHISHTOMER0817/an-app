import Image from "next/image";

const Content = ({title, company, img, location, salaryRange}) => {
    return (
        <>
            <div className="top-section">
                <div className="left-section">
                    <h5>{title}</h5>
                    <h6>{company}</h6>
                </div>
                <div className="right-section">
                    <Image
                        src={img}
                        alt="company logo"
                        width={50}
                        height={50}
                        />
                </div>
            </div>

            <div className="middle-section">
                <span>{location}</span>
                <span>
                    {salaryRange
                        ? salaryRange
                        : "Not Available"}
                </span>
            </div>
        </>
    )
}

export default Content;