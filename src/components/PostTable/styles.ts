import styled from 'styled-components'
import { PostStatusProps } from './types'

export const Container = styled.table`
  width: 100%;

  tr {
    height: 56px;
    display: flex;
    > a {
      display: flex;
      flex: 1;
      color: ${({ theme }) => theme.colors.text};
    }

    transition: background-color 0.1s;
    &:hover {
      background-color: #eff7ff;
    }
    &:not(:last-child) {
      box-shadow: inset 0px -1px 0px #e5e5e5;
    }
    .date {
      min-width: 128px;
    }
    .status {
      min-width: 180px;
    }
    .title {
      flex: 1;
    }
    td.title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;

      letter-spacing: 0.1px;
    }

    th {
      text-align: left;
      padding: 0 12px;
      background: #f5f5f5;
      box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.25);
      border-radius: 0px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.25px;
      display: flex;
      align-items: center;
      min-width: 168px;

      color: #333333;
    }

    td {
      min-width: 168px;
      padding: 0 12px;
      margin: auto 0;
      letter-spacing: 0.25px;
      font-size: 14px;
    }
  }
`

export const PostStatus = styled.span<PostStatusProps>`
  width: 100px;
  height: 24px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.4px;

  color: #ffffff;
  background: ${({ theme, closed }) => (closed ? '#ff5756' : '#4AAF05')};
  border-radius: 4px;
`
