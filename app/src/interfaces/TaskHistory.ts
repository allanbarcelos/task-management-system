export interface TaskHistory {
    id: number;
    taskItemId: number;
    oldStatus: string;
    newStatus: string;
    changedAt: string;
    changedByUserId: string;
};