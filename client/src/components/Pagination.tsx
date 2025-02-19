import { Pagination } from "@mui/material";
import { FC, useState } from "react";
import { getAllRooms } from "../api/room";
import { useQuery } from "react-query";

interface PaginationRoomsProps {
    data: any;
    page: number;
    limit: number;
    setPage: (page: number) => void;
  }

export const PaginationRooms: FC<PaginationRoomsProps> = ({ data, page, limit, setPage }) => {
    return (
        <Pagination
            count={Math.ceil(data.total / limit)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
        />
    );
}