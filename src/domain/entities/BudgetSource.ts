import type { BudgetSourceDto, BudgetSourceProps } from "../types/budget-source";

class BudgetSource {
    private _id: string;
    private _value: number;
    private _currency: string;

    private constructor(props: BudgetSourceProps) {
        this._id = crypto.randomUUID();
        this._value = this.validateValue(props.value);
        this._currency = props.currency;
    }

    private validateValue(value: number) {
        if (isNaN(value)) {
            throw new Error("Value must be a number");
        } else if (value <= 0) {
            throw new Error("Value must be greater than 0");
        }
        return value;
    }

    static create(props: BudgetSourceProps) {
        return new BudgetSource(props);
    }

    get id() {
        return this._id;
    }

    get value() {
        return this._value;
    }

    get currency() {
        return this._currency;
    }

    get toSnapshot(): BudgetSourceDto {
        return {
            BudgetSourceId: this._id,
            value: this._value,
            currency: this._currency,
        }
    }

}

export default BudgetSource;