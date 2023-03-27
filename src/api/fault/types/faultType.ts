export interface FaultQueryRecord {
    eleId: string;
    faultType: number;
}

export interface FaultListPageParams extends Partial<FaultQueryRecord> {
    page: number;
    size: number;
}

export interface FaultDetailQueryParams {
    faultId: string;
}