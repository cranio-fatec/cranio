import React, { useState, useRef, useCallback } from 'react'

import { MdClose, MdContactMail, MdExtension, MdMenuBook } from 'react-icons/md'
import { SelectOption } from '../../@types/Select'
import { Graduation } from '../../@types/User'
import Input from '../Input'
import Select from '../Select'
import { SignupFormProps } from '../StudentSignupForm/types'

import { Container } from './styles'

const levels = [
  'Tecnólogo',
  'Bacharelado',
  'Licenciatura',
  'Pós-graduação',
  'Mestrado',
  'Doutorado',
  'Pós-doutorado'
]

const TeacherSignupForm: React.FC<SignupFormProps> = ({
  setFormdata,
  subjects
}) => {
  const [graduations, setGraduations] = useState<Graduation[]>([])
  const [level, setLevel] = useState<SelectOption>(null)
  const [subject, setSubject] = useState<SelectOption>(null)
  const [isLevelErrored, setIsLevelErrored] = useState(false)
  const [isSubjectErrored, setIsSubjectErrored] = useState(false)
  const [isAreaErrored, setIsAreaErrored] = useState(false)
  const areaInput = useRef<HTMLInputElement>(null)

  const handleAddGraduation = useCallback(async () => {
    let error = false
    const area = areaInput.current.value
    if (!level) {
      setIsLevelErrored(true)
      error = true
    }
    if (!subject) {
      setIsSubjectErrored(true)
      error = true
    }
    if (!area) {
      setIsAreaErrored(true)
      error = true
    }

    if (error) {
      alert('Please fill all the fields.')
      return
    }

    setIsLevelErrored(false)
    setIsSubjectErrored(false)
    setIsAreaErrored(false)

    const graduation: Graduation = {
      area,
      level: level.value,
      subject: subject.value
    }

    setGraduations(oldGraduations => {
      setFormdata({
        graduations: [...oldGraduations, graduation]
      })
      return [...oldGraduations, graduation]
    })

    setLevel(null)
    setSubject(null)
    areaInput.current.value = ''
  }, [level, setFormdata, subject])

  const handleRemoveGraduation = useCallback((graduation: Graduation) => {
    setGraduations(oldData =>
      oldData.filter(
        searchedGraduation =>
          searchedGraduation.area !== graduation.area &&
          searchedGraduation.level !== graduation.level &&
          searchedGraduation.subject !== graduation.subject
      )
    )
  }, [])

  return (
    <Container>
      <h2>Cadastrar-se como professor</h2>
      <h3>Adicionar graduações</h3>
      <div>
        <div>
          <Select
            options={levels.map(option => ({
              value: option,
              label: option
            }))}
            labelRequired
            label="Nível da graduação"
            placeholder="Selecione o nível da sua graduação"
            leftIcon={MdContactMail}
            maxMenuHeight={170}
            isErrored={isLevelErrored}
            onChange={(option: SelectOption) => {
              setIsLevelErrored(false)
              setLevel(option)
            }}
            value={level}
          />
          <Select
            options={subjects.map(option => ({
              value: option.id,
              label: option.name
            }))}
            isErrored={isSubjectErrored}
            labelRequired
            label="Matéria relacionada"
            placeholder="Selecione a matéria relacionada à sua graduação"
            maxMenuHeight={170}
            leftIcon={MdExtension}
            onChange={(option: SelectOption) => {
              setIsSubjectErrored(false)
              setSubject(option)
            }}
            value={subject}
          />
        </div>
        <Input
          type="text"
          labelRequired
          label="Área de graduação"
          placeholder="Digite a área da sua graduação"
          leftIcon={MdMenuBook}
          ref={areaInput}
          isErrored={isAreaErrored}
          onChange={e => {
            // setFormdata(oldValue => ({
            //   ...oldValue,
            //   institution: e.target.value
            // }))
          }}
        />
        <span onClick={handleAddGraduation}>+ Adicionar Graduação</span>
        <ul>
          {graduations.map(graduation => (
            <li key={`${graduation.level}__${graduation.area}`}>
              <span>
                {graduation.level} em {graduation.area}
              </span>
              <MdClose onClick={() => handleRemoveGraduation(graduation)} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default TeacherSignupForm
