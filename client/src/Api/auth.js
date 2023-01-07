export const setAuthToken = (user) => {
    const currentUser = {
        email: user?.email
    }
    // save user in db and get token
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/${user?.email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            // save token to localstorage
            localStorage.setItem("aircnc-token", data.token)
        })
}