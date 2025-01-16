import { HTTP_STATUS_CODE, ResponseType } from "@/lib/types/apiResponse";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException, InvalidInputError } from "@/lib/errors/inputExceptions";
import mongo from "@/lib/db/client";
import { RequestItem } from "@/lib/db/types";
import { RequestStatus } from "@/lib/types/request";
import { ObjectId } from "mongodb";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import formatDate from "@/lib/dateFormat";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || null;
  const page = parseInt(url.searchParams.get("page") || "1");

  if (status && !Object.values(RequestStatus).includes(status as RequestStatus)) {
    throw new InvalidInputError("status");
  }

  const skip = (page - 1) * PAGINATION_PAGE_SIZE;
  const query: Partial<RequestItem> = {};
  if (status) {
    query.status = status as RequestStatus;
  }

  try {
    const mongoClient = await mongo;
    const db = mongoClient.db('main');
    const requests = db.collection<RequestItem>('Request');

    const totalCount = await requests.countDocuments(query);

    const items = await requests
      .find(query)
      .skip(skip)
      .limit(PAGINATION_PAGE_SIZE)
      .toArray();

    const formattedItems = items.map((item) => ({
      ...item,
      createdDate: formatDate(item.createdDate),
      lastEditedDate: formatDate(item.lastEditedDate),
    }));

    return new Response(
      JSON.stringify({
        items: formattedItems,
        isEmpty: formattedItems.length === 0,
        totalCount
      }),
      {
        status: HTTP_STATUS_CODE.OK,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const mongoClient = await mongo;
    const db = mongoClient.db('main');
    const requests = db.collection<RequestItem>('Request');

    if (!req.itemRequested) {
        return new InvalidInputError('itemRequested');
    }

    if (!req.requestorName) {
        return new InvalidInputError('requestorName');
    }

    const newRequestItem: RequestItem =  {
        id: new ObjectId(),
        requestorName: req.requestorName,
        itemRequested: req.itemRequested,
        createdDate: new Date(),
        lastEditedDate: new Date(),
        status: RequestStatus.PENDING,
    };

    const item = await requests.insertOne(newRequestItem);
    
    return new Response(JSON.stringify(item), {
      status: HTTP_STATUS_CODE.CREATED,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PATCH(request: Request) {
  try {
    const req = await request.json();

    if (!req.status) {
        return new InvalidInputError('status');
    }

    if (!req.id) {
        return new InvalidInputError('id');
    }

    if (!Object.values(RequestStatus).includes(req.status as RequestStatus)) {
        return new InvalidInputError('status');
    }

    const mongoClient = await mongo;
    const db = mongoClient.db('main');
    const requests = db.collection<RequestItem>('Request');

    const updatedItem = await requests.updateOne(
        { id: req.id },
        {
            $set: {
                status: req.status,
                lastEditedDate: new Date(),
            },
        }
    )
    
    if (!updatedItem.acknowledged) {
        return new InvalidInputError('id');
    }
    
    return new Response(JSON.stringify(updatedItem), {
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