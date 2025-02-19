import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { FilterPanel } from '../components/FilterPanel';
import { useMe } from '../hooks/useMe'
import { Rooms } from '../components/Rooms';
import { Filter } from '../components/Filter';
import { Pagination } from '@mui/material';

export const Main: React.FC = () => {
  const { mutate: profile, isLoading, error } = useMe();

  useEffect(() => {
    profile()
  }, [])

  return (
    <Layout>
      <div className='px-20 py-4'>
        <div className="mb-6">
          <h1>Главная / Доступные номера</h1>
        </div>
        <div className="flex">
          {/* Левая колонка для фильтра */}
          <div className="w-full sm:w-1/4 p-6">
            <FilterPanel />
          </div>
          {/* Правая колонка для контента */}
          <div className="w-full  sm:w-3/4 p-6">
            <Filter />
            <h2 className=" text-xl  font-semibold mb-4 mt-3 ">Доступные номера</h2>
            <Rooms />
          </div>
        </div>
      </div>
    </Layout>
  );
};
