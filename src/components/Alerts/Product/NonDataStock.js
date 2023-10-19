import Swal from 'sweetalert2';
import styles from '../Alerts.module.css'


const NonDataStock = () => {
    Swal.fire({
        icon: 'error',
        title: 'No Stock',
        text: 'Add at least 1 unit to an item from stock.',
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

export default NonDataStock