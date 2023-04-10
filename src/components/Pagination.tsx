import styled from "styled-components";
import theme from "../styles/theme";
import Button from "./Button";

type PaginationProps = {
    onPreviousPage: () => void,
    onNextPage: () => void,
    currentPage: number,
    totalPages: number | undefined,
}
const PaginationWrapper = styled.div`
color: ${theme.white};
margin: 1rem 0px;
display: flex;
justify-content: center;
align-items: center;
`;

const PaginationText = styled.span`
margin: 0px 0.5rem;
font-weight: 700;
color: ${theme.white};
`;

export const Pagination = ({ onPreviousPage, onNextPage, currentPage, totalPages }: PaginationProps) => {
    return (
        <PaginationWrapper>
            <Button onClick={onPreviousPage}>Prev</Button>
            <PaginationText>{currentPage} of {totalPages}</PaginationText>
            <Button onClick={onNextPage}>Next</Button>
        </PaginationWrapper>
    );
}