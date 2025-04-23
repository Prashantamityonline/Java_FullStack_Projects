export default function imageValidators(e) {
    let { files } = e.target
    if (files.length === 0)
        return "Pic Field is Mendatory"
    else if (files.length === 1) {
        const pic = files[0]
        if (pic.size > 1048576)
            return "Pic size is more then 1 mb please upload an image less than 1 mb"
        else if (pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif")
            return ""
        else
            return "Invalid Pic. Please Upload .jpeg,.jpg,.png or .gif image"
    }
    else {
        let errorMessage = []
        for (let index in Array.from(files)) {
            let pic = files[index]
            if (pic.size > 1048576)
                errorMessage.push(`Pic ${parseInt(index) + 1} size is more then 1 mb please upload an image less than 1 mb`)
            else if (pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif");
            else
                errorMessage.push(`Invalid Pic${parseInt(index) + 1} Please Upload .jpeg,.jpg,.png or .gif image`)
        }
        return errorMessage.length === 0 ? "" : errorMessage
    }
}