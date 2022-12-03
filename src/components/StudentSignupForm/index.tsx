import React from 'react'
import { MdApartment, MdExtension } from 'react-icons/md'

import Input from '../Input'
import Select from '../Select'
import { Container } from './styles'
import { SignupFormProps } from './types'

const StudentSignupForm: React.FC<SignupFormProps> = ({
	setFormdata,
	subjects
}) => {
	// const [graduations, setGraduations] = useState([])

	return (
		<Container>
			<h2>Cadastrar-se como aluno</h2>
			<div>
				<Select
					options={subjects.map((option) => ({
						value: option.id,
						label: option.name
					}))}
					label="Matéria Favorita"
					placeholder="Selecione sua matéria favorita"
					maxMenuHeight={170}
					leftIcon={MdExtension}
					onChange={(option: any) => {
						// setGraduations((oldValue) => ([...old]))
						// setSelected(true)
						setFormdata((oldValue: any) => ({
							...oldValue,
							favoriteSubjectId: option.value
						}))
					}}
				/>
				<Input
					type="text"
					label="Instituição Atual"
					placeholder="Estudo atualmente em..."
					leftIcon={MdApartment}
					onChange={(e) => {
						setFormdata((oldValue: any) => ({
							...oldValue,
							institution: e.target.value
						}))
					}}
				/>
			</div>
		</Container>
	)
}

export default StudentSignupForm
