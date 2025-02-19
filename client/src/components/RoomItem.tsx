import React from 'react'
import { MdOutlineStar } from "react-icons/md";
import { getReviewInfo } from '../api/review';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface IRoomItem {
    number: number,
    price: number,
    images: string[],
    roomId: string
}

export const RoomItem: React.FC<IRoomItem> = ({ number, price, images, roomId }) => {
    const { data } = useQuery(['reviewCount', roomId], () => getReviewInfo(roomId));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000
    };

    return (
        <div className="flex flex-col shadow-lg bg-white rounded-md hover:opacity-80 transform  duration-1000">
            <div className="relative overflow-hidden">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img className="h-36 w-full rounded-t-md object-cover" src={img} alt={`Номер ${number}`} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="p-4 w-full flex items-center justify-between">
                <p className="text-2xl font-bold"><span className="text-sm">№</span>{number}</p>
                <p className="text-slate-500">{price}₽ в сутки</p>
            </div>
            <hr className="mx-2" />
            <div className="flex justify-between items-center p-4">
                <div className="flex gap-2 items-center">
                    <MdOutlineStar size={32} color="#0033FF" />
                    <span>{data?.avgRating}</span>
                </div>
                <div>
                    <p className="text-slate-500">{data?.reviewCount ?? 0} отзывов(а)</p>
                </div>
            </div>
        </div>
    );
};
