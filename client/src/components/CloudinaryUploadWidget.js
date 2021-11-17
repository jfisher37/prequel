import React from "react";

function CloudinaryUploadWidget() {
    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dq3jfvis9",
            uploadPreset: "cyajgdzc"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
            }
        }
    );
    
    const uploadClick = () => {
        myWidget.open()
    }


    return (
        <div>

            <button id="upload_widget" onClick={uploadClick} className="cloudinary-button">
                Upload
            </button>

        </div>
    );
}


export default CloudinaryUploadWidget;
