import React from "react";
import Swal from "sweetalert2";

const CreateBrandModal = () => {
    const openModal = () => {
        Swal.fire({
            title: "Crear Marca",
            html: (
                <div>
                    <input id="image" className="swal2-input" placeholder="Imagen" />
                    <input id="brand" className="swal2-input" placeholder="Marca" />
                    <input id="website" className="swal2-input" placeholder="Sitio Web" />
                    <input id="phone" className="swal2-input" placeholder="Teléfono" />
                    <input id="email" className="swal2-input" placeholder="Correo Electrónico" />
                </div>
            ),
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Crear",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const image = document.getElementById("image").value;
                const brand = document.getElementById("brand").value;
                const website = document.getElementById("website").value;
                const phone = document.getElementById("phone").value;
                const email = document.getElementById("email").value;

                // Realiza acciones con los valores ingresados, como enviarlos a un servidor.
                console.log("Imagen:", image);
                console.log("Marca:", brand);
                console.log("Sitio Web:", website);
                console.log("Teléfono:", phone);
                console.log("Correo Electrónico:", email);
            },
        });
    };

    return (
        <div>
            <button onClick={openModal}>Crear Marca</button>
        </div>
    );
}

export default CreateBrandModal;
