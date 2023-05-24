import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from "../../../components/sectionTitle/SectionTitle";



const Category = () => {
    return (
        <section>
            <SectionTitle
                heading={'ORDER ONLINE'}
                subHeading={'--- From 11:00am to 10:00pm ---'}
            >

            </SectionTitle>

            <Swiper
                slidesPerView={4}
                centeredSlides={false}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide className="mb-20">
                    <img src={slide1} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">salads</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Pizza</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Soups</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Desserts</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">salads</h2>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;