import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="my-20">
            {title && <Cover img={img} title={title} />}
            <div className="grid md:grid-cols-2 gap-10 my-20">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>

            <Link to={`/order/${title}`}>
                <button className="btn my-5 btn-outline border-b-4 border-0">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;