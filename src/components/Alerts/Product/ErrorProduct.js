import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'

const ErrorProduct = () => {
    Swal.fire({
        icon: 'error',
        title: 'Error Creating Product',
        text: 'Please verify the fields',
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

export default ErrorProduct