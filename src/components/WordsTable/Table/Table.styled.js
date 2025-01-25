import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 18px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
  max-width: 1240px;

  @media only screen and (min-width: 768px) {
    max-width: 704px;
  }

  @media only screen and (min-width: 1440px) {
    max-width: 1240px;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  border-radius: 8px;

  @media only screen and (min-width: 768px) {
    border-radius: 8px;
  }
`;

export const TableItem = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-radius: 8px;

  & th,
  & td {
    padding: 16px 14px;
    border: 1px solid ${({ theme }) => theme.colors.tableBorder};
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
    text-align: left; /* Текст вирівнюється зліва */
    word-wrap: break-word; /* Перенос слів у комірках */
  }

  & th {
    background: ${({ theme }) => theme.colors.lightGreen};
    font-size: 16px;
  }

  & td {
    background: ${({ theme }) => theme.colors.white};
    font-size: 14px;
  }

  @media only screen and (min-width: 768px) {
    & th,
    td {
      padding: 22px;
      font-size: 18px;
    }
  }

  @media only screen and (min-width: 1440px) {
    & th,
    td {
      font-size: 20px;
    }
  }
`;

export const BoxWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const ActionsBtnContainer = styled.div`
  position: relative;
`;

export const ActionsBtn = styled.button`
  background: transparent;
`;

export const AddToDictionaryBtn = styled.button`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 20px;
    height: 20px;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;

    & p {
      color: ${({ theme }) => theme.colors.black};
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap; /* Уникнення переносу тексту */

      &:hover {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
`;
