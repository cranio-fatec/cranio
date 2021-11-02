import styled from 'styled-components'
import { containerCenter } from '../../styles/utils/containerCenter'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.blue_0};
  height: 83px;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${containerCenter}

  > nav ul {
    display: flex;
    list-style: none;

    li {
      &:not(:first-child) {
        margin-left: 12px;
      }

      a {
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;

        letter-spacing: 0.15px;

        color: #ffffff;
      }
    }
  }

  > form {
    width: 340px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  button {
    &:not(:last-child) {
      margin-right: 45px;
    }
  }
`

export const UserDataContainer = styled.div`
  position: relative;
`

export const UserDataContent = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  strong {
    font-weight: 500;
    font-size: 28px;
    line-height: 30px;

    letter-spacing: 0.15px;

    color: #ffffff;
    margin-right: 16px;
  }
`
