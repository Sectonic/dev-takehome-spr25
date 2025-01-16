import { RequestStatus } from "../types/request";
import { ObjectId } from "mongodb";

export interface RequestItem {
    id: ObjectId;
    requestorName: string;
    itemRequested: string;
    createdDate: Date;
    lastEditedDate?: Date;
    status: RequestStatus;
}