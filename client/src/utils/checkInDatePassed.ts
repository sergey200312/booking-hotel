export const checkInDatePassed = (startDate: Date) => {
    return new Date() < new Date(startDate)
}