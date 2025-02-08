import React from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,faStarHalf
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Iproduct {
    id: number,
    title: string,
    price: string,
    ratings: string,
    old_price?: string,
    price_percentage?: string,
    img_url: string
}

const product:Iproduct[] = [
    {
        id : 9,
        title : "Polo with Contrast Trims",
        price : "$212",
        ratings : "5.0/5",
        old_price : "$242",
        price_percentage : "-20%",
        img_url : "/product-detail/alsolike1.png"
    },
    {
        id : 10,
        title : "Gradient Graphic T-shirt",
        price : "$145",
        ratings : "4.0/5",
        img_url : "/product-detail/alsolike2.png"
    },
    {
        id : 11,
        title : "Polo with Tipping Details",
        price : "$180",
        ratings : "3.0/5",
        img_url : "/product-detail/alsolike3.png"
    },
    {
        id : 12,
        title : "Black Striped T-shirt",
        price : "$120",
        ratings : "4.5/5",
        old_price : "$152",
        img_url : "/product-detail/alsolike4.png"
    }
]



export default function Also_like_product(){
        return(
            <div className="w-full h-full mt-12 max-w-screen-2xl mx-auto">
                <h1 className="text-3xl md:text-[48px] font-extrabold text-center px-2">YOU MIGHT ALSO LIKE</h1>

                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center md:justify-between px-14 mt-10">
                    {
                        product.map((data)=>{
                            return( 
                                    <Link href={`/products/${data.id}`} key={data.id}>
                                <div key={data.id} className="mb-5 lg:mb-0">
                                    <div className="w-[220px] h-[230px] md:w-[290px] md:h-[300px] bg-[#F0EEED] rounded-[20px] overflow-hidden">
                                    <Image src={data.img_url} alt={data.title} width={300} height={300}
                                    className="w-full h-full rounded-[20px] hover:scale-110 transition-all duration-500">
                                    </Image>
                                    </div>

                                    <div>
                                    <p className="md:text-[18px] text-[16px] font-bold md:mt-3 mt-1">{data.title}</p>
                                    <div className="flex text-yellow-400 md:text-[14px] text-[12px] gap-2 mt-1">
                                        <p>{<FontAwesomeIcon icon={faStar} />}</p>
                                        <p>{<FontAwesomeIcon icon={faStar} />}</p>
                                        <p>{<FontAwesomeIcon icon={faStar} />}</p>
                                        <p>{<FontAwesomeIcon icon={faStar} />}</p>
                                        <p>{<FontAwesomeIcon icon={faStarHalf} />}</p>
                                        <p className="text-black/60 md:text-[14px] text-[12px]">{data.ratings}</p>
                                    </div>
                                    <p className="md:text-[20px] text-[18px] font-bold mt-1 flex items-center gap-3">{data.price} 
                                        <span className="text-black/40 line-through">{data.old_price}</span>
                                        {data.price_percentage && (
  <span className="text-[12px] py-[6px] px-[14px] rounded-[62px] bg-[#FF3333]/10 text-[#FF3333]">
    {data.price_percentage}
  </span>
)}
                                        </p>
                                    </div>
                                    
                                </div>
                                    </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
}