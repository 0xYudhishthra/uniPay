import React, { useState } from "react";

interface Product {
  image: string | null;
  price: number | null;
}

export const MerchantSignupView: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>("");
  const [contactDetails, setContactDetails] = useState<string>("");
  const [businessCategory, setBusinessCategory] = useState<string>(
    "Select Business Category"
  );
  const [numOfProducts, setNumOfProducts] = useState<number>(1);
  const [products, setProducts] = useState<Array<Product>>(
    Array(numOfProducts).fill({ image: null, price: null })
  );

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: any
  ) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index][field] = value;
      return newProducts;
    });
  };

  const handleNumberOfProductsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setNumOfProducts(value);
      setProducts(Array(value).fill({ image: null, price: null }));
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const draggedIndex = Number(event.dataTransfer.getData("text/plain"));
    const newProducts = [...products];
    const [draggedProduct] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(index, 0, draggedProduct);
    setProducts(newProducts);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden p-4">
      {/* Website Name */}
      <h1 className="text-4xl text-white font-bold mb-4">UniPay.</h1>

      {/* Register Business */}
      {/* Register Business */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-4 mb-4 w-full max-w-xl text-white">
        <h2 className="text-2xl">Register your Business</h2>

        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name"
          className="p-2 rounded-md w-full mb-2 bg-gray-700 text-white" // Adjusted styles
        />

        <input
          type="text"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          placeholder="Contact Details (e.g. Phone or Email)"
          className="p-2 rounded-md w-full mb-2 bg-gray-700 text-white" // Adjusted styles
        />

        <select
          value={businessCategory}
          onChange={(e) => setBusinessCategory(e.target.value)}
          className="p-2 rounded-md w-full mb-2 bg-gray-700 text-white" // Adjusted styles
        >
          <option value="Select Business Category" disabled>
            Select Business Category
          </option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Automotive">Automotive</option>
        </select>

        <div>
          <label className="p-2 rounded-md w-full mb-2 bg-gray-700 text-white">
            Number of Products
          </label>
          <input
            className="p-2 rounded-md w-full mb-2 bg-gray-700 text-white"
            type="number"
            min="1"
            value={numOfProducts}
            onChange={handleNumberOfProductsChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {products.map((product, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              className="flex flex-col items-center space-y-2 bg-gray-700 p-2 rounded-md relative"
            >
              <label className="w-32 h-32 flex items-center justify-center bg-gray-600 rounded-md cursor-pointer">
                {!product.image ? (
                  <>
                    <span>Click to upload</span>
                    <input
                      type="file"
                      key={`input-${index}`} // Add this
                      style={{ position: "absolute", opacity: 0 }}
                      onChange={(e) => {
                        const currentFileIndex = index; // Capture the current index
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = function (event) {
                            handleProductChange(
                              currentFileIndex,
                              "image",
                              event.target?.result
                            ); // Use the captured index
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </>
                ) : (
                  <img
                    src={product.image}
                    alt={`Product ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md mb-2"
                  />
                )}
              </label>

              <input
                type="number"
                placeholder={`Price for Product ${index + 1}`}
                onChange={(e) =>
                  handleProductChange(
                    index,
                    "price",
                    parseFloat(e.target.value)
                  )
                }
                className="p-2 rounded-md w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save and Continue */}
      <div className="mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-xl transform hover:scale-110 transition-transform duration-300 mr-2">
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default MerchantSignupView;
