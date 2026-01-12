import { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../../assets/data";
import { UseAppContext } from "../../context/AppContext";

function AddProduct() {
  const { axios, getToken } = UseAppContext();
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
  });
  const [sizePrices, setSizePrices] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const allCategories = ["Hair Care", "Body Care", "Face Care"];
  const allTypes = [
    "Body-spray",
    "Cleanser",
    "Hand-Wash",
    "Lip-Product",
    "Lotion",
    "Oil",
    "Perfume",
    "Serum",
    "Shampoo",
  ];

  const addSizePrices = () => {
    if (!newSize && !newPrice) {
      toast.error("Please enter size and price");
      return;
    }
    if (!newPrice && newSize) {
      toast.error("Please enter price");
      return;
    }
    if (!newSize && newPrice) {
      toast.error("Please enter size");
      return;
    }
    if (sizePrices.some((sp) => sp.size === newSize)) {
      toast.error("Size already exists");
      return;
    }
    setSizePrices([
      ...sizePrices,
      { size: newSize, price: parseFloat(newPrice) },
    ]);
    setNewPrice("");
    setNewPrice("");
  };
  const removeSizePrice = (size) => {
    setSizePrices(sizePrices.filter((sp) => sp.size !== size));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    //check if all inputs are filled
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.category ||
      !inputs.type
    ) {
      toast.error("please fill all required fileds");
      return;
    }
    if (sizePrices.length === 0) {
      toast.error("please add at least one size and price");
      return;
    }
    // check if at least 1 image is uploaded
    const hasImage = Object.values(images).some((img) => img !== null);

    if (!hasImage) {
      toast.error("please upload at least one image");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();

      const prices = {};
      const sizes = [];
      sizePrices.forEach((sp) => {
        prices[sp.size] = sp.price;
        sizes.push(sp.size);
      });

      const productData = {
        title: inputs.title,
        description: inputs.description,
        category: inputs.category,
        type: inputs.type,
        popular: inputs.popular,
        price: prices,
        sizes: sizes,
      };

      formData.append("productData", JSON.stringify(productData));

      // adding images to formdata
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const { data } = await axios.post("/api/products", formData, {
        header: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        toast.success(data.message);
        //reset form after success
        setInputs({
          title: "",
          description: "",
          category: "",
          type: "",
          popular: false,
        });
        setSizePrices([]);
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error("error");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="p-5">
        <div className="pName w-full mb-4">
          <h5 className="h5">Product Name</h5>
          <input
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            value={inputs.title}
            type="text"
            placeholder="Type here"
            className="px-3 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-full add-input"
          />
        </div>
        <div className="pDescription w-full mb-4">
          <h5 className="h5">Product Description</h5>
          <input
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
            value={inputs.description}
            type="text"
            placeholder="Type here"
            className="px-3 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-full add-input"
          />
        </div>
        <div className="flex gap-4 flex-wrap ">
          <div className="selectCategory">
            <h5 className="h5">Category</h5>
            <select
              onChange={(e) =>
                setInputs({ ...inputs, category: e.target.value })
              }
              value={inputs.category}
              className="w-38 px-3 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1.5 cursor-pointer"
            >
              <option value="">Select Category</option>
              {allCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <h5 className="h5">Types</h5>
            <select
              onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
              value={inputs.type}
              className="w-36 px-3 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1.5 cursor-pointer"
            >
              <option value="">Select Type</option>
              {allTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*Size and Price Pairs*/}
        <div className="w-full mt-6 mb-6">
          <h5 className="h5">Sizes and Prices</h5>
          <div className="flex gap-4 mt-2">
            <h5 className="h5">size:</h5>
            <input
              onChange={(e) => setNewSize(e.target.value)}
              value={newSize}
              type="text"
              placeholder="(e.g. 50ml)"
              className="w-32 px-2 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14"
            />
            <h5 className="h5">Price:</h5>
            <input
              onChange={(e) => setNewPrice(e.target.value)}
              value={newPrice}
              type="number"
              placeholder="$0.00"
              className="w-32 px-2 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14"
            />
            <button
              type="button"
              onClick={addSizePrices}
              className="btn-secondary p-2"
            >
              Add
            </button>
          </div>
          <div className="mt-5">
            {sizePrices.map((sp, i) => (
              <div key={i}>
                <span>
                  {sp.size}: ${sp.price}
                </span>
                <button
                  type="button"
                  onClick={() => removeSizePrice(sp.size)}
                  className=" btn-secondary p-2 ml-3 text-[12px]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        {/*Images*/}
        <div className="flex gap-2 mt-7 mb-4">
          {Object.keys(images).map((key) => (
            <label
              key={key}
              htmlFor={`productImage${key}`}
              className="w-32 px-3 py-1.5 ring-1 ring-slate 900/10 rounded-lg bg-white text-gray-600 medium-14"
            >
              <input
                id={`productImage${key}`}
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
                type="file"
                accept="image/*"
                hidden
              />
              <div className="h-16 bg-white flexCenter">
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadIcon
                  }
                  alt=""
                  className="cursor-pointer"
                />
              </div>
            </label>
          ))}
        </div>
        <div className="flex gap-2 ml-1 mt-3">
          <h5 className="h5"> Add To Popular</h5>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={inputs.popular}
            onChange={(e) =>
              setInputs({ ...inputs, popular: e.target.checked })
            }
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-secondary p-1 font-semibold mt-3 max-w-36 sm:w-full rounded-xl"
        >
          {loading ? "Adding " : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
