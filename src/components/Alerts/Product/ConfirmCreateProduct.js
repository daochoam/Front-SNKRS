import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'
import axiosInstance from '../../../utils/axiosInstance';
import ProductSuccess from './ProductSuccess';
import ErrorProduct from './ErrorProduct';

const ConfirmCreateProduct = async (Product, formData, redirect) => {
    Swal.fire({
        icon: '',
        title: 'Creating Product...',
        text: 'Want to create the current product',
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
                redirect(true)
            } catch (error) {
                ErrorProduct()
            }
        }
    });
}

export default ConfirmCreateProduct
