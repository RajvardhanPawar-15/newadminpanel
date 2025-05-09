import React, { useEffect, useState } from "react";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productImg, setProductImage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://167.88.42.205/api/products/${productId}/`
        );
        setProduct(response.data);
        setProductImage(response.data.images[0].image);
      } catch (e) {
        console.error("Cant get product data", e);
      }
    };
    fetchProductData();
  }, [productId]); //

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4 className="font-bold text-lg">Product Details</h4>
              <h6 className="text-sm">{product.name}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="productdetails">
                    <ul className="product-bar">
                      <li>
                        <h4>Vegetarian Status</h4>
                        {product.is_veg ? (
                          <span className="bg-green-600 ml-2 my-1 rounded-lg p-1 text-sm text-white">
                            veg
                          </span>
                        ) : (
                          <span className="bg-red-600 ml-2 rounded-lg my-1 p-1 text-sm text-white">
                            non-veg
                          </span>
                        )}
                      </li>
                      <li>
                        <h4>Product</h4>
                        <h6>{product.name}</h6>
                      </li>
                      <li>
                        <h4>Category</h4>
                        <h6>{product.category}</h6>
                      </li>
                      <li>
                        <h4>Sub Category</h4>
                        <h6>{product.subcategory}</h6>
                      </li>
                      <li>
                        <h4>Slug</h4>
                        <h6>{product.slug}</h6>
                      </li>
                      <li>
                        <h4>Low Stock Threshold</h4>
                        <h6>{product.low_stock_threshold}</h6>
                      </li>
                      <li>
                        <h4>SKU</h4>
                        <h6>{product.sku}</h6>
                      </li>
                      <li>
                        <h4>Stock</h4>
                        <h6>{product.stock}</h6>
                      </li>
                      <li>
                        <h4>Discounted Price</h4>
                        <h6>{product.discounted_price}</h6>
                      </li>
                      <li>
                        <h4>Price</h4>
                        <h6>{product.price}</h6>
                      </li>
                      <li>
                        <h4>Season</h4>
                        <h6>{product.season_flag}</h6>
                      </li>
                      <li>
                        <h4>Manufacturing Date</h4>
                        <h6>{product.manufacturing_date}</h6>
                      </li>
                      <li>
                        <h4>Expiry Date</h4>
                        <h6>{product.expiry_date}</h6>
                      </li>
                      <li>
                        <h4>Description</h4>
                        <h6>{product.description}</h6>
                      </li>
                      <li>
                        <h4>Ingredients</h4>
                        <h6>{product.ingredients}</h6>
                      </li>
                      <li>
                        <h4>Cook Time</h4>
                        <h6>{product.cook_time}</h6>
                      </li>
                      <li>
                        <h4>Nutrition Info</h4>
                        <h6>{product.nutrition_info}</h6>
                      </li>
                      <li>
                        <h4>Recipes</h4>
                        <h6>{product.recipes}</h6>
                      </li>
                      <li>
                        <h4>Unit</h4>
                        <h6>{product.unit}</h6>
                      </li>
                      <li>
                        <h4>Flavour</h4>
                        <h6>{product.flavour}</h6>
                      </li>
                      <li>
                        <h4>Variants</h4>
                        <h6>
                          {product.variants.length > 0 ? (
                            <div className="flex flex-col gap-4">
                              {product.variants.map((item) => (
                                <>
                                  <ul className="flex flex-col gap-2">
                                    <li>Variant Name: {item.variant_name} </li>
                                    <li>Variant Price: {item.price} </li>
                                    <li>
                                      Variant Discounted Price:{" "}
                                      {item.discounted_price}{" "}
                                    </li>
                                    <li>Variant Stock: {item.stock} </li>
                                  </ul>
                                </>
                              ))}
                            </div>
                          ) : (
                            "No Variants Present"
                          )}
                        </h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="slider-product-details">
                    <div className="slider-product flex justify-center items-center">
                      {product.images.length === 0 ? (
                        <p>No Image Available</p>
                      ) : (
                        <img
                          className="object-contain w-full h-full"
                          src={`http://167.88.42.205${productImg}`}
                          alt={product.name}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
