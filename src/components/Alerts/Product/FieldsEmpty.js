import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'

const FieldsEmpty = () => {
    Swal.fire({
        icon: 'error',
        title: 'Empty fields',
        text: 'Please complete all fields',
        imer: 3000,
        confirmButtonText: 'OK',
        customClass: {
            popup: styles.BodyAlert,
            confirmButton: styles.BtnBlack,
            title: styles.TitleAlert,
            container: styles.ContentAlert,

        },
    });
}

export default FieldsEmpty