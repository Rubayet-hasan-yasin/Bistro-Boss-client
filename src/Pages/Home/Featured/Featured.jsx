import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import featureImg from "../../../assets/home/featured.jpg"
import './Featured.css'



const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-8 my-28 text-white"> 
            <SectionTitle subHeading={'---Check it out---'} heading={'FROM OUR MENU'} />
            <div className="md:flex space-x-16 justify-center items-center py-20 px-36">
                <div>
                    <img src={featureImg} alt="" />
                </div>
                <div>
                    <p className="text-2xl ">March 20, 2023</p>
                    <p className="text-2xl ">WHERE CAN I GET SOME?</p>
                    <p className=" my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>

                    <button className="btn my-5 btn-outline border-b-4 border-0 text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;