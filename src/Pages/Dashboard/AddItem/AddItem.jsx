import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const img_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;
console.log(img_hosting_token);


const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`


    const onSubmit = data => {
        const formData = new FormData();
        formData.append("image", data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then(imageResponse=> {
            if(imageResponse.success){
                const imgURL = imageResponse.data.display_url;
                const {name, price, category, recipe} = data;
                const newItem = {name, price: parseFloat(price), category, recipe, image: imgURL}
                console.log(newItem);

                axiosSecure.post('/menu', newItem)
                .then(data=> {
                    console.log('after posting new menu item', data.data);
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Item added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })

    };



    return (
        <div className="w-11/12">
            <SectionTitle subHeading="--What's new--" heading="Add an Item" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full " />

                </div>


                <div className="flex space-x-5">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue="pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Drinks</option>
                            <option>Dessert</option>

                        </select>
                    </div>



                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full " />

                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>

                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image*</span>

                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />

                </div>

                <input type="submit" value="Add item" className="btn btn-sm w-full mt-9" />
            </form>
        </div>
    );
};

export default AddItem;