export const getImageUrl = async image => {
    const formData = new FormData()
    formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=20e217807e5b93e67747b8407c24eff4`

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })
    const data = await response.json()
    return data.data.display_url
}