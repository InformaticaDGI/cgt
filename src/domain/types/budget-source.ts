export type BudgetSourceDto = {
    BudgetSourceId: string;
    value: number;
    currency: string;
}

export type BudgetSourceProps = {
    value: number;
    currency: string;
}