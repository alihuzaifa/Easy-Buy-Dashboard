import React from "react";
const FormikCommonError = ({ name, touched, error }) => {
    return (
        <>
            {name && touched ? (
                <div style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</div>
            ) : null}
        </>
    );
};
export default FormikCommonError;