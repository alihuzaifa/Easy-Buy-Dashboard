import * as Yup from "yup";

// ALL INITIAL VALUES
const LoginInitialValues = {
    email: "",
    password: "",
};
const productInitialValues = {
    name: "",
    category: "",
    description: "",
    price: 0,
    image: null,
    _id: "",
    isUpload: true
};
const faqInitialValues = { question: "", answer: "", _id: "" };
const userValues = { email: '', name: "", password: '', phone: '', isVerified: true };

const OfferInitialValues = {
    image: null,
    _id: "",
};
const OfferValidationSchema = Yup.object().shape({
    image: Yup.mixed().required("Please upload an image"),
});

// ALL SCHEMAS
const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string()
        .required("password is required")
        .min(6, "Password must be at least 6 characters"),
});
const productSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    category: Yup.string().required("category is required"),
    description: Yup.string().required("discription is required"),
    image: Yup.mixed().when('isUpload', {
        is: true,
        then: Yup.mixed().required('File is required'),
        otherwise: Yup.mixed().nullable(),
    }),
    price: Yup.number()
        .required("enter price")
        .min(2, "Price must greater than 2 digits"),
});
const faqSchema = Yup.object().shape({
    question: Yup.string()
        .required("Question is required")
        .min(6, "Question must be at least 6 characters"),
    answer: Yup.string()
        .required("Answer is required")
        .min(10, "Answer must be at least 6 characters"),
});
const userSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().min(8, 'Password should contain at least 8 characters').required('Password is required'),
    name: Yup.string().required("Name is required").min(2, 'Name is invalid'),
    phone: Yup.string().required("Phone number is required").length(11)
});


export {
    LoginInitialValues,
    productInitialValues,
    LoginSchema,
    productSchema,
    OfferInitialValues,
    OfferValidationSchema,
    faqInitialValues,
    faqSchema,
    userValues,
    userSchema
};