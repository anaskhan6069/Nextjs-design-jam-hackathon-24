
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { client } from "@/sanity/lib/client";


interface Iproduct {
  id: number;
  title: string;
  price: string;
  ratings: string;
  old_price?: string;
  price_percentage?: string;
  img_url: string;
}

const product: Iproduct[] = [
  {
    id: 1,
    title: "T-shirt with Tape Details",
    price: "$120",
    ratings: "4.5/5",
    img_url: "/products/product1.png",
  },
  {
    id: 2,
    title: "Skinny Fit Jeans",
    price: "$240",
    ratings: "3.5/5",
    old_price: "$260",
    price_percentage: "-20%",
    img_url: "/products/product2.png",
  },
  {
    id: 3,
    title: "Checked Shirt",
    price: "$180",
    ratings: "4.5/5",
    img_url: "/products/product3.png",
  },
  {
    id: 4,
    title: "Sleeve Striped T-shirt",
    price: "$130",
    ratings: "4.5/5",
    old_price: "$160",
    price_percentage: "-30%",
    img_url: "/products/product4.png",
  },
];

const fetchData = async () => {
  try {
    const productData = await client.fetch(`*[_type == "products"]{
      _id,
      name,
      description,
      price,
      sizes,
      colors,
      image,
      discountPercent,
      isNew
    }`);
    
    console.log("Product data: ", productData);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

fetchData();


export default function New_arrival() {
  return (
    <>
      <div className="w-[93%] h-[full] mt-12 max-w-screen-2xl mx-auto">
        <h1 className="text-3xl md:text-[48px] font-extrabold text-center">
          New Arrivals
        </h1>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center md:justify-between mt-10 ">
          {product.map((data) => {
            return (
                <Link href={`/products/${data.id}`} key={data.id}>
              <div key={data.id} className="mb-5 lg:mb-0">
                  <div className="w-[220px] h-[230px] md:w-[290px] md:h-[300px] bg-[#F0EEED] rounded-[20px] overflow-hidden">
                    <Image
                      src={data.img_url}
                      alt={data.title}
                      width={300}
                      height={300}
                      className="w-full h-full rounded-[20px] hover:scale-110 transition-all duration-500"
                    ></Image>
                  </div>

                <div>
                  <p className="md:text-[18px] text-[16px] font-bold md:mt-3 mt-1">
                    {data.title}
                  </p>
                  <div className="flex text-[#FFC633] md:text-[14px] text-[12px] gap-2 mt-1">
                    <p>{<FontAwesomeIcon icon={faStar} />}</p>
                    <p>{<FontAwesomeIcon icon={faStar} />}</p>
                    <p>{<FontAwesomeIcon icon={faStar} />}</p>
                    <p>{<FontAwesomeIcon icon={faStar} />}</p>
                    <p>{<FontAwesomeIcon icon={faStarHalf} />}</p>
                    <p className="text-black/60 md:text-[14px] text-[12px]">
                      {data.ratings}
                    </p>
                  </div>
                  <p className="md:text-[22px] text-[20px] font-bold mt-1 flex items-center gap-3">
                    {data.price}
                    <span className="text-black/40 line-through">
                      {data.old_price}
                    </span>
                    {data.price_percentage && (
  <span className="text-[12px] py-[6px] px-[14px] rounded-[62px] bg-[#FF3333]/10 text-[#FF3333]">
    {data.price_percentage}
  </span>
)}
                  </p>
                </div>
              </div>
                </Link>
            );
          })}
        </div>

        <div className="flex justify-center items-center">
          <button className="border hover:bg-slate-200 transition-all duration-200 w-full md:w-[218px] px-[54px] py-[14px] rounded-[62px] mt-7">
            View All
          </button>
        </div>
      </div>

      
    </>
  );
}
