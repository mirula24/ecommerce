import { Select, SelectItem } from "@nextui-org/react";
import ProductFormLabel from "../components/ProductFormLabel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductApi from "../apis/ProductsApi";
import { useEffect, useState } from "react";
import { ImagePlaceholderUrl } from "../constants/images.constant";

function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const location = useLocation();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryIds: [],
    image: null,
    imageUrl: ImagePlaceholderUrl,
  });
  const categories = useSelector((state) => {
    return state.productCategories.items;
  });

  const setProductState = (product) => {
    setProduct((prev) => {
      return {
        ...prev,
        ...product,
        categoryIds: product.categories.map((category) =>
          category.id.toString()
        ),
        imageUrl:
          product.imageUrls && product.imageUrls.length > 0
            ? product.imageUrls[0]
            : ImagePlaceholderUrl,
      };
    });
  };

  const getProductDetail = async (productId) => {
    const product = await ProductApi.getProductDetail(productId);
    setProductState(product);
  };

  useEffect(() => {
    ProductApi.getCategories();
    if (productId) {
      const product = location.state;
      setProductState(product);
      getProductDetail(productId);
    }
  }, [productId]);

  const cancelHandler = () => {
    navigate(-1);
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const categoriesHandler = (select) => {
    setProduct((prev) => {
      return {
        ...prev,
        categoryIds: [...select],
      };
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct((prev) => {
          return {
            ...prev,
            image: file,
            imageUrl: reader.result,
          };
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setProduct((prev) => {
      return {
        ...prev,
        image: null,
        imageUrl: ImagePlaceholderUrl,
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {productId ? "Edit Product" : "Add New Product"}
      </h1>
      <form className="space-y-6 ">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="name" />
              <input
                onChange={inputHandler}
                value={product.name}
                type="text"
                name="name"
                id="name"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <ProductFormLabel name="description" />
              <textarea
                onChange={inputHandler}
                value={product.description}
                type="text"
                name="description"
                id="description"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"
                required
              />
            </div>
            <div>
              <ProductFormLabel name="price" />
              <input
                type="number"
                onChange={inputHandler}
                value={product.price}
                name="price"
                id="price"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product price"
                required
              />
            </div>
            <div>
              <ProductFormLabel name="stock" />
              <input
                type="number"
                onChange={inputHandler}
                value={product.stock}
                name="stock"
                id="stock"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product stock"
                required
              />
            </div>

            <div>
              <ProductFormLabel name="categories" />
              <Select
                id="categories"
                name="categories"
                label="Categories"
                selectionMode="multiple"
                placeholder="Select categories"
                selectedKeys={product.categoryIds}
                onSelectionChange={categoriesHandler}
                className="w-full"
              >
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    textValue={category.name}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            <ProductFormLabel name="image" />
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <img
                  className="mx-auto h-64 w-64 text-gray-400 object-cover rounded-md"
                  src={ImagePlaceholderUrl}
                  alt="Product preview"
                />
                <div>
                  <div className="flex text-sm text-gray-600 justify-center mt-2">
                    <ProductFormLabel
                      name="file-upload"
                      textLabel="Upload a file"
                      customClassName="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      withSpan
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="file-upload"
                        id="file-upload"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </ProductFormLabel>
                    <p className="pl-1"> or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <button
                    onClick={handleRemoveImage}
                    type="button"
                    className="mt-2 px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                cancelHandler();
              }}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="
            px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {productId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductDetailsPage;
