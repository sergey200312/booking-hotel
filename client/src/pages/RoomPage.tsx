import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { AmenitiesSection } from '../components/AmenitiesSection';
import { BookingCard } from '../components/BookingCard';
import { ReviewList } from '../components/ReviewList';
import { BookingRules } from '../components/BookingRules';
import { useParams } from 'react-router-dom';
import { getDetailRoom } from '../api/room';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const RoomPage: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery(['room', id], () => getDetailRoom(String(id)));
    const [image, setImage] = useState('');

    useEffect(() => {
        if (data?.images?.length) {
            setImage(data.images[0]);
        }
    }, [data]);

    if (isLoading) return <div>Загрузка...</div>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Layout>
            <div className="px-8 pt-3">
                <div className="mb-3">
                    <h1>Главная / Доступные номера / Номер №{data.number}</h1>
                </div>

                <div className="mb-10">
                    <Slider {...sliderSettings} className="w-full">
                        {data.images.map((img: string, index: number) => (
                            <div key={index} className="px-2">
                                <img src={img} alt={`Изображение ${index + 1}`} className="w-full h-96 object-cover rounded-lg" />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div>
                                <p className="text-xl font-semibold mb-4">Сведения о номере</p>
                                <AmenitiesSection />
                            </div>
                            <div>
                                <p className="text-xl font-semibold mb-4">Впечатления о номере</p>
                                <p>Общая оценка: <span className="font-bold">5 из 5</span></p>
                            </div>
                        </div>

                        <div className="mr-20 mb-10">
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-xl font-semibold">Отзывы посетителей номера</p>
                            </div>
                            <ReviewList />
                        </div>

                        <div className="mr-20">
                            <BookingRules />
                        </div>
                    </div>

                    <div>
                        <div className="col-span-1 pt-14 px-10 pb-10 shadow-2xl">
                            <BookingCard number={data.number} price={data.price} type={data.type} roomId={String(id)} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
