import { Subject } from '@prisma/client'

interface Formdata {
	[key: string]: any
}

export interface SignupFormProps {
	setFormdata: (data: Formdata) => void
	subjects: Subject[]
}

// export interface StudentSignupFormProps extends SignupFormProps {
// }
