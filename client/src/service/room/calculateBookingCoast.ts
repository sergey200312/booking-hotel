export const calculateBookingCost = (checkInDate: string, checkOutDate: string, price: number) => {

    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)

    if (checkIn >= checkOut) {
        throw new Error('Дата заезда должна быть раньше даты выезда')
    }

    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const total = days * price

    return { total, days}
};
