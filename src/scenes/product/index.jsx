import { Box, useTheme, Button, Input, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import { productInitialValues, productSchema } from "../../schema";
import { deleteApiMethod, getApiMethod, postApiMethod, updateApiMethod } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import FormikCommonError from "../../components/FormikCommonError";
import moment from "moment/moment";
import EditIcon from '@mui/icons-material/Edit';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
const style = {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    flexDirection: "column",
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "100%"
};
const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [clicled, setclicled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);
    const [list, setlist] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(
        "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
    );
    const handleDelete = async (_id) => {
        setclicled(true)
        try {
            const deleteProduct = await deleteApiMethod("product/delete", { _id });
            if (deleteProduct?.data?.success) {
                setIsLoad(!isLoad);
                toast.success(`${deleteProduct?.data.message}`, {
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
    const handleEdit = async (e) => {
        setIsEditMode(true);
        formik.setFieldValue("_id", e?._id);
        formik.setFieldValue("category", e?.category);
        formik.setFieldValue("name", e?.name);
        formik.setFieldValue("description", e?.description);
        formik.setFieldValue("price", e?.price);
        formik.setFieldValue('isUpload', false)
        setImageSrc(e?.image?.url);
        setOpen(true)
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Product Name", flex: 1 },
        { field: "price", headerName: "Product Price", flex: 1 },
        { field: "category", headerName: "Product Category", flex: 1 },
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
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <>
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
                        </>
                        {
                            clicled ? <EditIcon
                                size={"1.5rem"}
                                style={{ color: 'green' }}
                                onClick={() => {
                                }}
                            /> : <EditIcon
                                size={"1.5rem"}
                                style={{ color: 'green' }}
                                onClick={() => {
                                    handleEdit(row);
                                }}
                            />
                        }

                    </div>
                );
            },
        },
    ];
    const formik = useFormik({
        initialValues: productInitialValues,
        validationSchema: productSchema,
        onSubmit: async (values) => {
            const { name, category, description, price, image, _id, isUpload } =
                values;
            if (!isEditMode) {
                try {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("category", category);
                    formData.append("description", description);
                    formData.append("price", price);
                    formData.append("image", image);
                    const postProduct = await postApiMethod("product/add", formData);
                    if (postProduct?.data?.success) {
                        formik.resetForm({ values: "" });
                        setOpen(false)
                        setImageSrc(
                            "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
                        );
                        setIsLoad(!isLoad);
                        toast.success(`${postProduct?.data?.message}`, {
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
                    toast.error(`${error?.message}`, {
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
            } else {
                try {
                    if (isUpload) {
                        const formData = new FormData();
                        formData.append("name", name);
                        formData.append("category", category);
                        formData.append("description", description);
                        formData.append("price", price);
                        formData.append("image", image);
                        formData.append("_id", _id);
                        formData.append("isUpload", isUpload);
                        const postProduct = await updateApiMethod("product/update", formData);
                        if (postProduct?.data?.success) {
                            formik.resetForm({ values: "" });
                            setImageSrc(
                                "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
                            );
                            setIsLoad(!isLoad);
                            toast.success(`${postProduct?.data?.message}`, {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            setOpen(false)
                            setIsEditMode(false)
                        }
                    } else {
                        const postObj = {
                            name, category, description, price, image, _id, isUpload
                        }
                        const postProduct = await updateApiMethod("product/update", postObj);
                        if (postProduct?.data?.success) {
                            formik.resetForm({ values: "" });
                            setImageSrc(
                                "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
                            );
                            setIsLoad(!isLoad);
                            setOpen(false);
                            setIsEditMode(false)
                            toast.success(`${postProduct?.data?.message}`, {
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
                    }

                } catch (error) {
                    toast.error(`${error?.message}`, {
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
    const handleEditProductImageUpload = (e) => {
        formik.setFieldValue('isUpload', true)
        const file = e.target.files[0];
        convertImageIntoBase64(file);
        formik.setFieldValue("image", file);
    };
    const GetAllProducts = async () => {
        const AllProducts = await getApiMethod('product/getAllProducts')
        if (AllProducts?.data?.success) {
            const addIdToEveryObj = AllProducts?.data?.data?.map((obj, i) => { return { ...obj, id: i } })
            setlist(addIdToEveryObj)
        }
    }
    React.useEffect(() => {
        GetAllProducts()
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
                <Header title="PRODUCT" subtitle="List of all products" />
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
                        Add Product
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid components={{ Toolbar: GridToolbar }} rows={list} columns={columns} />
                {/* <DataGrid checkboxSelection rows={list} columns={columns} /> */}
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
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                name="name"
                                error={!!formik.touched.name && !!formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{ gridColumn: "span 2", marginTop: "5px", marginBottom: '5px' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Price"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                name="price"
                                error={!!formik.touched.price && !!formik.errors.price}
                                helperText={formik.touched.price && formik.errors.price}
                                sx={{ gridColumn: "span 2", marginTop: "5px", marginBottom: '5px' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                name="description"
                                error={!!formik.touched.description && !!formik.errors.description}
                                helperText={formik.touched.description && formik.errors.description}
                                sx={{ gridColumn: "span 2", marginTop: "5px", marginBottom: '5px' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.category}
                                name="category"
                                error={!!formik.touched.category && !!formik.errors.category}
                                helperText={formik.touched.category && formik.errors.category}
                                sx={{ gridColumn: "span 2", marginTop: "5px", marginBottom: '5px' }}
                            />
                            {/*  */}
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
                            {
                                isEditMode ?
                                    <Box sx={{ justifyContent: "center", display: "flex" }}>
                                        <Input
                                            type="file"
                                            id="file-input"
                                            style={{ display: 'none' }}
                                            onChange={handleEditProductImageUpload}
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
                                    :
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
                            }
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
                                    {isEditMode ? <><BrowserUpdatedIcon />
                                        Update</> : <><AddIcon />
                                        Add</>}

                                </Button>
                            </Box>

                        </Box>
                    </Fade>
                </Modal>
            </div>
        </Box>
    );
};
export default Products;