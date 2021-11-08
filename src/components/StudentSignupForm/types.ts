interface Formdata {
  [key: string]: any
}

export interface SignupFormProps {
  setFormdata: (data: Formdata) => void
  subjects: {
    id: string
    name: string
  }[]
}

// export interface StudentSignupFormProps extends SignupFormProps {
// }
