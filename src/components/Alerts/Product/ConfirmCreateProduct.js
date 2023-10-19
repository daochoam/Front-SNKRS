import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'
import axiosInstance from '../../../utils/axiosInstance';
import ProductSuccess from './ProductSuccess';
import ErrorProduct from './ErrorProduct';

const ConfirmCreateProduct = (Product) => {
    Swal.fire({
        icon: 'error',
        title: 'Error Creating Product',
        text: 'Please verify the fields',
        timer: 3000,
        showCancelButton: true,
        confirmButtonText: 'Create',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: styles.BodyAlert,
            title: styles.TitleAlert,
            container: styles.ContentAlert,
            actions: styles.actionsButtons,
            confirmButton: styles.BtnBlack,
            cancelButton: styles.BtnCancel,
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const { _id } = await axiosInstance.post(`/product`, Product)
                await axiosInstance.put(`/product/${_id}`,)
                ProductSuccess()
            } catch (error) {
                ErrorProduct()
            }
        }
    });
}

export default ConfirmCreateProduct
