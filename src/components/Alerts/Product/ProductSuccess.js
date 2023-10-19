import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'

const ProductSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Product Created Successfully',
        timer: 3000,
        confirmButtonText: 'OK',
        customClass: {
            popup: styles.BodyAlert,
            confirmButton: styles.BtnBlack,
            title: styles.TitleAlert,
            container: styles.ContentAlert,

        },
    });
}

export default ProductSuccess