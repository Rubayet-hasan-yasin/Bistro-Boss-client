import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopulerMenu = () => {
    const [menu] = useMenu();
    const populer = menu.filter(item=> item.category === 'popular');



    return (
        <section className="mb-12">
            <SectionTitle subHeading='---Check it out---' heading='FROM OUR MENU' />

            <div className="grid md:grid-cols-2 gap-10">
                {
                    populer.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>
            <div className="text-center">
                <button className="btn my-5 btn-outline border-b-4 border-0">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopulerMenu;