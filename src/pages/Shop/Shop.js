import React, { useState ,useContext } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import { GlobalData } from "../../context/globalData";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const { darkMode } = useContext(GlobalData);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className={`h-full w-full mx-auto p-4 
    ${darkMode ? "dark dark:text-white" : "light text-black"}`}>

      {/* ================= Products Start here =================== */}
      <div className="w-50 h-50 flex pb-20 gap-10">
     
        <div className="w-full mdl:w-[100%] lgl:w-[100%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
