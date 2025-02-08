"use client";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import React, { useEffect, useState, CSSProperties } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Filters_up } from "@/components/filters-up";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";


interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  discountPercent: number;
}

interface Iproduct {
  id: number;
  title: string;
  price: string;
  ratings: string;
  old_price?: string;
  price_percentage?: string;
  img_url: string;
}

// const product: Iproduct[] = [
//   {
//     id: 1,
//     title: "T-shirt with Tape Details",
//     price: "$120",
//     ratings: "4.5/5",
//     img_url: "/products/product1.png",
//   },
//   {
//     id: 2,
//     title: "Skinny Fit Jeans",
//     price: "$240",
//     ratings: "3.5/5",
//     old_price: "$260",
//     price_percentage: "-20%",
//     img_url: "/products/product2.png",
//   },
//   {
//     id: 3,
//     title: "Checked Shirt",
//     price: "$180",
//     ratings: "4.5/5",
//     img_url: "/products/product3.png",
//   },
//   {
//     id: 4,
//     title: "Sleeve Striped T-shirt",
//     price: "$130",
//     ratings: "4.5/5",
//     old_price: "$160",
//     price_percentage: "-30%",
//     img_url: "/products/product4.png",
//   },
//   {
//     id: 5,
//     title: "Checked Shirt",
//     price: "$180",
//     ratings: "4.5/5",
//     img_url: "/products/product3.png",
//   },
//   {
//     id: 6,
//     title: "Sleeve Striped T-shirt",
//     price: "$130",
//     ratings: "4.5/5",
//     old_price: "$160",
//     price_percentage: "-30%",
//     img_url: "/products/product4.png",
//   },
//   {
//     id: 7,
//     title: "Checked Shirt",
//     price: "$180",
//     ratings: "4.5/5",
//     img_url: "/products/product3.png",
//   },
//   {
//     id: 8,
//     title: "Sleeve Striped T-shirt",
//     price: "$130",
//     ratings: "4.5/5",
//     old_price: "$160",
//     price_percentage: "-30%",
//     img_url: "/products/product4.png",
//   },
//   {
//     id: 9,
//     title: "Checked Shirt",
//     price: "$180",
//     ratings: "4.5/5",
//     img_url: "/products/product3.png",
//   },
// ];

export default function Casual_Shirts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<IProduct[] | null>(null);

  // Fetch product details from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "products"]{
  _id,
  name,
    price,
    image,
    discountPercent,
    
}`);
        // console.log("Sanity Data:", data);
      const filteredProducts = data.filter((_:any, index:any) => index !== 2 && index !== 15);

        setProductData(filteredProducts);
      } catch (err: any) {
        setError("There is an error. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <ClimbingBoxLoader />
        <p>Loading products...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }
  
  console.log(productData)
  return (
    <>
      <div className="w-full h-[full] max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-5 md:mb-0 px-5 md:px-0">
          <h1 className="text-[30px] md:text-[32px] md:text-left font-extrabold text-center">
            Casual
          </h1>
          <div className="block md:hidden">
            <Filters_up />
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center md:justify-between mt-2">
          {productData && productData.length > 0 ? (
            productData.map((data) => (
              <Link href={`/products/${data._id}`} key={data._id}>
                <div key={data._id} className="mb-5 lg:mb-7 ">
                  <div className="w-[220px] h-[230px] md:w-[290px] md:h-[300px] bg-[#F0EEED] rounded-[20px] overflow-hidden">
                    <Image
                      src={urlFor(data.image).url()}
                      alt={data.name}
                      width={300}
                      height={300}
                      className="w-full h-full rounded-[20px] hover:scale-110 transition-all duration-500"
                    />
                  </div>

                  <div>
                    <p className="md:text-[18px] text-[16px] font-bold md:mt-3 mt-1">
                      {data.name}
                    </p>
                    <div className="flex text-[#FFC633] md:text-[14px] text-[12px] gap-2 mt-1">
                      <p>{<FontAwesomeIcon icon={faStar} />}</p>
                      <p>{<FontAwesomeIcon icon={faStar} />}</p>
                      <p>{<FontAwesomeIcon icon={faStar} />}</p>
                      <p>{<FontAwesomeIcon icon={faStar} />}</p>
                      <p>{<FontAwesomeIcon icon={faStarHalf} />}</p>
                      {/* <p className="text-black/60 md:text-[14px] text-[12px]">
                        {data.ratings}
                      </p> */}
                    </div>
                    <p className="md:text-[22px] text-[20px] font-bold mt-1 flex items-center gap-3">
                      {data.price}$
                      {/* <span className="text-black/40 line-through">
                        {data.old_price}
                      </span> */}
                      {data.discountPercent ? (
                        <span className="text-[12px] py-[6px] px-[14px] rounded-[62px] bg-[#FF3333]/10 text-[#FF3333]">
                          {data.discountPercent}%
                        </span>
                      ) : (
                        null
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available</p> // You can display a message if no data is available
          )}
        </div>
      </div>
    </>
  );
}
