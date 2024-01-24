import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import ReactPaginate from "react-paginate";

import { paginationItems } from "../../../constants";
import axios from "axios";
import { GlobalData } from "../../../context/globalData";

const Product = lazy(() => import("../../home/Products/Product"));
function Items({ currentItems }) {
  const { category, setCategory } = useContext(GlobalData);

  return (
    <>
      {currentItems && category == "All"
        ? currentItems?.map((item) => (
            <div key={item._id} className="w-full">
               <Suspense
                  fallback={<div className="text-center"> loading please wait...</div>}
                >
              <Product
                _id={item.id}
                img={item.image}
                productName={item.title}
                price={item.price}
                category={item.category}
                badge={item.badge}
                des={item.description}
              /></Suspense>
            </div>
          ))
        : currentItems
            ?.filter((cat) => cat.category == category)
            ?.map((item) => (
              <div key={item._id} className="w-full">
                <Suspense
                  fallback={<div className="text-center"> loading please wait...</div>}
                >
                  <Product
                    _id={item.id}
                    img={item.image}
                    productName={item.title}
                    price={item.price}
                    category={item.category}
                    badge={item.badge}
                    des={item.description}
                  />
                </Suspense>
              </div>
            ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [products, setProducts] = useState([]);
  // Simulate fetching products from another resources.
  // (This could be products from props; or products loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading products from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        console.log("Product data:", response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between products-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center products-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {products.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
