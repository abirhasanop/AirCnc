// Save a booking
export const saveBooking = async bookingData => {
    const url = `${process.env.REACT_APP_SERVER_URL}/bookings`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    })

    const data = await response.json()

    return data
}

// Get All Bookings for user
export const getAllBookingsByEmail = async email => {
    const url = `${process.env.REACT_APP_SERVER_URL}/bookings?email=${email}`

    const response = await fetch(url)

    const data = await response.json()

    return data
}

// Get All Bookings for Admin
export const getAllBookings = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/bookings`

    const response = await fetch(url)

    const data = await response.json()

    return data
}

// Cancel A booking