import * as yup from "yup";

const authSchema = yup.object({
    username: yup.string().required("Username is required.").min(5,"Minimum length of username is 5"),
    password: yup.string().required("Password is required.").min(8,"Minimum length of password is 8").max(20,"Maximum length of password is 20"),
  });
  
type AuthType = yup.InferType<typeof authSchema>;

const settingSchema = yup.object({
    username: yup.string().required("Username is required.").min(5,"Minimum length of username is 5"),
    new_password: yup.string().required("Password is required.").min(8,"Minimum length of password is 8").max(20,"Maximum length of password is 20"),
    email: yup.string().email("Invalid email format").required("Email is required."),
    current_password: yup.string().required("Password is required.").min(8,"Minimum length of password is 8").max(20,"Maximum length of password is 20"),
});

const signUpSchema = authSchema.shape({
    email: yup.string().email("Invalid email format").required("Email is required."),
    confirmPassword: yup.string().required("Password is required.").min(8,"Minimum length of password is 8").max(20,"Maximum length of password is 20")
})

type SignupType = yup.InferType<typeof signUpSchema>
type SettingType = yup.InferType<typeof settingSchema>

export {
    authSchema, signUpSchema, settingSchema
};
export type { AuthType, SignupType ,SettingType};

