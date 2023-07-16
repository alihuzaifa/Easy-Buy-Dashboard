import React from "react";
import { Box, useTheme, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import { faqInitialValues, faqSchema } from "../../schema";
import { useFormik } from "formik";
import { deleteApiMethod, getApiMethod, postApiMethod, updateApiMethod } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
};
const FAQ = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [clicled, setclicled] = React.useState(false);
  const [isDisabled, setisDisabled] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);
  const [list, setlist] = React.useState([]);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const colors = tokens(theme.palette.mode);
  const formik = useFormik({
    initialValues: faqInitialValues,
    validationSchema: faqSchema,
    onSubmit: async (values) => {
      const { question, answer, _id } = values;
      setisDisabled(true)
      if (isEditMode) {
        const postObj = await updateApiMethod('faq/updateFaq', { question, answer, _id })
        if (postObj?.data?.success) {
          formik.resetForm()
          toast.success(`${postObj?.data?.message}`, {
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
          setIsLoad(!isLoad)
          setIsEditMode(false)
        }
      } else {
        const postObj = await postApiMethod('faq/addFaq', { question, answer })
        if (postObj?.data?.success) {
          formik.resetForm()
          toast.success(`${postObj?.data?.message}`, {
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
          setIsLoad(!isLoad)
        }
      }
      setisDisabled(false)
    },
  });
  const GetAllProducts = async () => {
    const AllFaqs = await getApiMethod('faq/getFaq')
    if (AllFaqs?.data?.success) {
      setlist(AllFaqs?.data?.data)
    }
  }
  const handleDelete = async (_id) => {
    setclicled(true)
    try {
      const deleteFaq = await deleteApiMethod("faq/deleteFaq", { _id });
      if (deleteFaq?.data?.success) {
        setIsLoad(!isLoad);
        toast.success(`${deleteFaq?.data.message}`, {
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
  const handleEdit = async (question, answer, _id) => {
    setIsEditMode(true);
    formik.setFieldValue("_id", _id);
    formik.setFieldValue("question", question);
    formik.setFieldValue("answer", answer);
    setOpen(true)
  };
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
        <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
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
            Add Faqs
          </Button>
        </Box>
      </Box>
      {
        list?.map(({ question, answer, _id }, index) => {
          return <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {answer}
              </Typography>
              <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", marginTop: 5 }}>
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
                        handleDelete(_id);
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
                      handleEdit(question, answer, _id);
                    }}
                  />
                }

              </div>
            </AccordionDetails>
          </Accordion>
        })
      }

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Question"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.question}
                name="question"
                error={!!formik.touched.question && !!formik.errors.question}
                helperText={formik.touched.question && formik.errors.question}
                sx={{ gridColumn: "span 2", marginTop: "5px", marginBottom: '5px' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Answer"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.answer}
                name="answer"
                error={!!formik.touched.answer && !!formik.errors.answer}
                helperText={formik.touched.answer && formik.errors.answer}
                sx={{ gridColumn: "span 2", marginTop: "5px", marginBottom: '5px' }}
              />

              <Box sx={{ justifyContent: "center", display: "flex", marginTop: '20px' }}>
                <Button
                  onClick={formik.submitForm}
                  disabled={isDisabled}
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
export default FAQ;