import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {

  const { user } = useSelector((state: {userReducer: UserReducerInitialState}) => state.userReducer);


  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    
      if (!name || !price || stock < 0 || !category || !photo) return;

      

      const formData = new FormData();

      formData.set("name", name);
      // formData.set("description", description);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
      formData.set("photo", photo);
      formData.set("category", category);

      // photos.file.forEach((file) => {
      //   formData.append("photos", file);
      // });

      const res = await newProduct({ id: user?._id!, formData });

     responseToast(res, navigate, "/admin/product");

    //   responseToast(res, navigate, "/admin/product");
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
        <div className="admin-container">
          <AdminSidebar />
          <main className="product-management">
            <article>
              <form onSubmit={submitHandler}>
                <h2>New Product</h2>
                <div>
                  <label>Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
    
                {/* <div>
                  <label>Description</label>
                  <textarea
                    required
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div> */}
    
                <div>
                  <label>Price</label>
                  <input
                    required
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    required
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                </div>
    
                <div>
                  <label>Category</label>
                  <input
                    required
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
    
                <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
      );
    };
    

export default NewProduct;









// import { useFileHandler } from "6pp";
// import { FormEvent, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { useNewProductMutation } from "../../../redux/api/productAPI";
// import { RootState } from "../../../redux/store";
// import { responseToast } from "../../../utils/features";

// const NewProduct = () => {
//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const [name, setName] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [price, setPrice] = useState<number>(1000);
//   const [stock, setStock] = useState<number>(1);
//   const [description, setDescription] = useState<string>("");

//   const [newProduct] = useNewProductMutation();
//   const navigate = useNavigate();

//   const photos = useFileHandler("multiple", 10, 5);

//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (!name || !price || stock < 0 || !category) return;

//       if (!photos.file || photos.file.length === 0) return;

//       const formData = new FormData();

//       formData.set("name", name);
//       formData.set("description", description);
//       formData.set("price", price.toString());
//       formData.set("stock", stock.toString());

//       formData.set("category", category);

//       photos.file.forEach((file) => {
//         formData.append("photos", file);
//       });

//       const res = await newProduct({ id: user?._id!, formData });

//       responseToast(res, navigate, "/admin/product");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main className="product-management">
//         <article>
//           <form onSubmit={submitHandler}>
//             <h2>New Product</h2>
//             <div>
//               <label>Name</label>
//               <input
//                 required
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>Description</label>
//               <textarea
//                 required
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>Price</label>
//               <input
//                 required
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//               />
//             </div>
//             <div>
//               <label>Stock</label>
//               <input
//                 required
//                 type="number"
//                 placeholder="Stock"
//                 value={stock}
//                 onChange={(e) => setStock(Number(e.target.value))}
//               />
//             </div>

//             <div>
//               <label>Category</label>
//               <input
//                 required
//                 type="text"
//                 placeholder="eg. laptop, camera etc"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>Photos</label>
//               <input
//                 required
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={photos.changeHandler}
//               />
//             </div>

//             {photos.error && <p>{photos.error}</p>}

//             {photos.preview &&
//               photos.preview.map((img, i) => (
//                 <img key={i} src={img} alt="New Image" />
//               ))}

//             <button disabled={isLoading} type="submit">
//               Create
//             </button>
//           </form>
//         </article>
//       </main>
//     </div>
//   );
// };

// export default NewProduct;