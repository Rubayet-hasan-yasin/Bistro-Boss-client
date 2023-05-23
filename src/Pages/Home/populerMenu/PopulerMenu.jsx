import { useEffect, useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopulerMenu = () => {
    const [menu, setMenu] = useState([]);


    useEffect(()=>{
        fetch('menu.json')
        .then(res=> res.json())
        .then(data=> {
            const populerItems = data.filter(item => item.category == 'popular')
            setMenu(populerItems)
        })
    },[])



    return (
        <section className="mb-12">
            <SectionTitle subHeading='---Check it out---' heading='FROM OUR MENU'/>

            <div className="grid grid-cols-2 gap-10">
                {
                    menu.map(item=> <MenuItem 
                    key={item._id}
                    item={item}
                    />)
                }
            </div>
        </section>
    );
};

export default PopulerMenu;