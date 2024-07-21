import { toast } from "react-toastify";


export const showErrorMsg = (msg) => {
    toast.error(msg, {
        position: "top-left"
    })
}

export const showSuccessMsg = (msg) => {
    toast.success(msg, {
        position: "top-left"
    })
}