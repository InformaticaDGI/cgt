import type { BudgetSourceDto, BudgetSourceProps } from "../types/budget-source";
import BudgetSource from "./BudgetSource";

class BudgetSourceList {
    private _budgetSources: Map<string, BudgetSourceDto>;

    private constructor() {
        this._budgetSources = new Map();
    }

    static create() {
        return new BudgetSourceList();
    }

    add(props: BudgetSourceProps) {
        const budgetSource = BudgetSource.create(props);
        const snapshot = budgetSource.toSnapshot;
        this._budgetSources.set(snapshot.BudgetSourceId, budgetSource.toSnapshot);
    }

    get(id: string) {
        return this._budgetSources.get(id);
    }

    get all() {
        return Array.from(this._budgetSources.values());
    }
}

export default BudgetSourceList;