import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'

const NonImageSelected = () => {
    Swal.fire({
        icon: 'error',
        title: 'Empty Images',
        text: 'Add at least one image.',
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

export default NonImageSelected