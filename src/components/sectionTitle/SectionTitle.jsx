
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center w-fit mx-auto my-8">
            <p className="text-yellow-600 mb-2">{subHeading}</p>
            <h3 className="text-4xl uppercase border-y-4 py-4 px-10 font-bold">{heading}</h3>
        </div>
    );
};

export default SectionTitle;