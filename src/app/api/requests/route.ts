import { HTTP_STATUS_CODE, ResponseType } from "@/lib/types/apiResponse";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException, InvalidInputError } from "@/lib/errors/inputExceptions";
import mongo from "@/lib/db/client";
import { RequestItem } from "@/lib/db/types";
import { RequestStatus } from "@/lib/types/request";
import { ObjectId } from "mongodb";

export async function PATCH(request: Request) {
    try {
      const req = await request.json();
  
      if (!req.status) {
          return new InvalidInputError('status');
      }
  
      if (!req.ids) {
          return new InvalidInputError('ids');
      }
  
      if (!Object.values(RequestStatus).includes(req.status as RequestStatus)) {
          return new InvalidInputError('status');
      }

      req.ids = req.ids.map((id: string) => new ObjectId(id));
  
      const mongoClient = await mongo;
      const db = mongoClient.db('main');
      const requests = db.collection<RequestItem>('Request');

      const updatedItems = await requests.updateMany(
        { id: { $in: req.ids } },
        { 
            $set: { 
                status: req.status, 
                lastEditedDate: new Date() 
            } 
        }
      )
      
      if (!updatedItems.acknowledged) {
          return new InvalidInputError('ids');
      }
      
      return new Response(JSON.stringify(updatedItems), {
        status: HTTP_STATUS_CODE.OK,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      if (e instanceof InputException) {
        return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
      }
      return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
    }
}

export async function DELETE(request: Request) {
    try {
        const req = await request.json();

        if (!req.ids) {
            return new InvalidInputError('ids');
        }

        req.ids = req.ids.map((id: string) => new ObjectId(id));

        const mongoClient = await mongo;
        const db = mongoClient.db('main');
        const requests = db.collection<RequestItem>('Request');

        const deleted = await requests.deleteMany(
            { id: { $in: req.ids } }
        )

        return new Response(JSON.stringify(deleted), {
            status: HTTP_STATUS_CODE.OK,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
      if (e instanceof InputException) {
        return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
      }
      return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
    }
}