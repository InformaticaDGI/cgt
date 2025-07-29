import { Flex } from "../Layout/Flex";
import { Button } from "../Ui/Button/Button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Text from "../Ui/Text/Text";
import { Select } from "../Ui/Select/Select";
import { useSearchParams } from "react-router";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
}

const Pagination = ({ currentPage, totalPages, rowsPerPage }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams, { replace: true });
    }

    const handleRowsPerPageChange = (value: string) => {
        searchParams.set('limit', value);
        setSearchParams(searchParams, { replace: true });
    }

    return (
        <Flex $direction="column" $justify="center" $align="center" $gap="1rem" $width="100%">
            <Flex $direction="row" $justify="end" $align="center" $gap="1rem" $padding="1rem">
                <Text $fontSize="12px" $fontWeight="500" $color="var(--text-secondary)">Filas por página</Text>
                <Select onChange={(value) => handleRowsPerPageChange(value)} options={[{ label: '10', value: '10' }, { label: '20', value: '20' }]} value={rowsPerPage.toString()} style={{ width: '70px' }} />
                <Text $fontSize="12px" $fontWeight="500" $color="var(--text-secondary)">{currentPage} - {rowsPerPage} de {totalPages}</Text>
                <Button $size="small" $variant="primary" onClick={() => handlePageChange(1)}>
                    <ChevronsLeft />
                </Button>
                <Button $size="small" $variant="primary" onClick={() => handlePageChange(currentPage - 1)}>
                    <ChevronLeft />
                </Button>
                <Button $size="small" $variant="primary" onClick={() => handlePageChange(currentPage + 1)}>
                    <ChevronRight />
                </Button>
                <Button $size="small" $variant="primary" onClick={() => handlePageChange(totalPages)}>
                    <ChevronsRight />
                </Button>
            </Flex>
        </Flex>
    )
}

export default Pagination;