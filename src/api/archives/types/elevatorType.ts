export interface Elevator {
    id: string;
    registCode: string;
    elevatorName: string;
    address: string;
    use: string;
    ownerIds: string;
    typeName: string;
    maintainName: string;
    propertyName: string;
    energyType: string;
    areaName: string;
    brandName: string;
    checkState: string;
    mainState: string;
    eleDeviceCode: string;
    qrCode: string;
    installDateStart: string;
    installDateEnds: string;
}
export interface ElevatorMap {
    id: string;
    elevatorName: string;
    address: string;
	longitude: string;
	latitude: string;
	gd_longitude: string;
	gd_latitude: string;
    
}
export interface ElevatorListPage extends Partial<Elevator> {
    page: number;
    size: number;
}

export interface EleId {
    eleId: string
}

export interface WorkId {
    workId: string
}

export interface DevCode {
    devCode: string
}

export interface WaveParams {
    devCode: string;
    createTime: string;
    faultCode: string;
}

export interface WorkOrder {
    id: string;
    elevatorName: string;
    maintainUnit: string;
    useUnit: string;
    alarmTime: string;
    use: string;
    ownerIds: string;
}

export interface WorkOrderListPage extends Partial<WorkOrder> {
    page: number;
    size: number;
}

export interface ArchivesWorkOrder {
    eleId: string;
    workType: string;
}

export interface ArchivesWorkOrderListPage extends Partial<ArchivesWorkOrder> {
    page: number;
    size: number;
}