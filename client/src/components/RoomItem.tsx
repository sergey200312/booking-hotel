import React from 'react'
import { MdFavorite, MdFavoriteBorder, MdOutlineStar } from "react-icons/md";
import { getReviewInfo } from '../api/review';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFavoriteRoom } from '../hooks/useFavoriteRoom';
import { checkFavorite } from '../api/favorite-rooms';

export interface IRoomItem {
    number: number,
    price: number,
    images: string[],
    roomId: string
}

export const RoomItem: React.FC<IRoomItem> = ({ number, price, images, roomId }) => {
    const { data, isLoading: isReviewLoading } = useQuery(['reviewCount', roomId], () => getReviewInfo(roomId));
    const { mutate: toggleFavoriteRoom } = useFavoriteRoom()
    const { data: isFavorite, isLoading: isFavoriteLoading } = useQuery(['favorite-rooms', roomId], () => checkFavorite(roomId))

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

    const handleFavoriteRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        toggleFavoriteRoom(roomId)
    }

    if (isReviewLoading || isFavoriteLoading) {
        return <div>Загрузка...</div>; 
    }

    return (
        <div className="flex flex-col shadow-lg bg-white rounded-md hover:opacity-80 transform duration-1000">
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
                    <div className="ml-6 relative group">
                        <button disabled={isFavoriteLoading} onClick={handleFavoriteRoom}>
                            {isFavorite ? <MdFavorite size={32} color="red" /> : <MdFavoriteBorder size={32} />}
                            <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {isFavorite ? "Удалить из понравившихся" : "Добавить в понравившиеся"}
                            </span>
                        </button>
                    </div>
                </div>
                <div>
                    <p className="text-slate-500">{data?.reviewCount ?? 0} отзывов(а)</p>
                </div>
            </div>
        </div>
    );
};
