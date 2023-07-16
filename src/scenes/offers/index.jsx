import { Box, useTheme, Button, Input } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from "formik";
import { OfferInitialValues, OfferValidationSchema } from "../../schema";
import { deleteApiMethod, getApiMethod, postApiMethod } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import FormikCommonError from "../../components/FormikCommonError";
import moment from "moment/moment";
const style = {
    position: 'absolute',
    top: '40%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Offers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [clicled, setclicled] = React.useState(false);
    const handleDelete = async (_id) => {
        setclicled(true)
        try {
            const deleteDish = await deleteApiMethod("offer/deleteOffer", {
                _id,
            });
            if (deleteDish?.status == 200) {
                setIsLoad(!isLoad);
                toast.success(`${deleteDish?.data.message}`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setclicled(false)
            }
        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setclicled(false)
    };
    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "_id", headerName: "Image ID", flex: 1 },
        {
            field: "createdAt",
            headerName: "Created Date",
            flex: 1,
            renderCell: (data) => {
                const offerDate = data?.row;
                const date = moment(offerDate?.createdAt).fromNow()
                return date;
            },
        },
        {
            field: "image",
            headerName: "Picture",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <div className="justify-items-center items-center">
                        <img
                            src={row?.image?.url}
                            alt="product image"
                            width={50}
                            height={50}
                            style={{
                                display: "flex",
                                borderRadius: "50%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <div className="flex justify-start items-center">
                        {
                            clicled ? <DeleteIcon
                                size={"1.5rem"}
                                style={{ color: 'red' }}
                                onClick={() => {
                                }}
                            /> : <DeleteIcon
                                size={"1.5rem"}
                                style={{ color: 'red' }}
                                onClick={() => {
                                    handleDelete(row?._id);
                                }}
                            />
                        }

                    </div>
                );
            },
        },
    ];
    const [open, setOpen] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);
    const [list, setlist] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [imageSrc, setImageSrc] = React.useState(
        "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
    );

    const formik = useFormik({
        initialValues: OfferInitialValues,
        validationSchema: OfferValidationSchema,
        onSubmit: async (values) => {
            const { image } = values;
            const formData = new FormData();
            formData.append("image", image);
            try {
                const postOffer = await postApiMethod(`offer/addOffer`, formData);
                setOpen(false)
                if (postOffer?.status == 200) {
                    formik.resetForm({ values: "" });
                    setImageSrc(
                        "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
                    );
                    setIsLoad(!isLoad);
                    toast.success(`${postOffer?.data?.message}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } catch (error) {
                toast.error(`${error.message}`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        },
    });


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        convertImageIntoBase64(file);
        formik.setFieldValue("image", file);
    };
    const convertImageIntoBase64 = (file) => {
        const imageReader = new FileReader();
        if (file) {
            imageReader.readAsDataURL(file);
            setImageSrc(
                "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
            );
            imageReader.onloadend = () => {
                setImageSrc(imageReader.result);
                // formik.setFieldValue("image", imageReader.result);
            };
        }
    }
    const GetAllOffers = async () => {
        const { status, data } = await getApiMethod('offer/getAllOffer')
        if (status === 200) {
            const addId = data?.map((obj, i) => { return { ...obj, id: i } })
            setlist(addId)
        }
    }
    React.useEffect(() => {
        GetAllOffers()
    }, [isLoad])

    return (
        <Box m="20px">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                limit={1}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={true}
                theme="light"
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="OFFERS" subtitle="All offer of the app" />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={handleOpen}
                    >
                        <AddIcon />
                        Add Offers
                    </Button>
                </Box>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={list} columns={columns} />
            </Box>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            {/* <Input type="file" /> */}
                            <Box sx={{ justifyContent: "center", display: "flex", marginBottom: '20px' }}>
                                <Box
                                    component={"img"}
                                    alt="upload-image"
                                    src={imageSrc}
                                    name="image"
                                    width="150px"
                                    height="100px"
                                    borderRadius="50%"
                                />
                            </Box>
                            <FormikCommonError
                                name={formik.errors.image}
                                touched={formik.touched.image}
                                error={formik.errors.image}
                            />
                            <Box sx={{ justifyContent: "center", display: "flex" }}>
                                <Input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-input">
                                    <Button
                                        sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "10px 20px",
                                        }}
                                        component="span"
                                    >
                                        <CloudUploadIcon />
                                    </Button>
                                </label>
                            </Box>
                            <Box sx={{ justifyContent: "center", display: "flex", marginTop: '20px' }}>
                                <Button
                                    onClick={formik.submitForm}
                                    sx={{
                                        backgroundColor: colors.blueAccent[700],
                                        color: colors.grey[100],
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                    }}
                                    component="span"
                                >
                                    <AddIcon />
                                    Add
                                </Button>
                            </Box>

                        </Box>
                    </Fade>
                </Modal>
            </div>
        </Box>
    );
};
export default Offers;