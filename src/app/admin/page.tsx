"use client"

import Alert from "@/components/atoms/Alert";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import RequestTable from "@/components/tables/Table";
import { FormEvent, useRef, useState } from "react";

export default function ItemRequestsPage() {
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const requestSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/request", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.message);
    }
    
    formRef.current?.reset();
    location.reload();

  }

  return (
    <div className="max-w-2xl mx-auto my-8 flex flex-col items-center p-5">
      { error && <Alert error={error} setError={setError} /> }
      <form 
        ref={formRef}
        className="flex flex-col md:flex-row justify-center md:items-end w-full gap-4"
        onSubmit={requestSubmit}
      >
        <Input
          type="text"
          placeholder="Type the requestor"
          required={true}
          name="requestorName"
          label="Requestor"
        />
        <Input
          type="text"
          placeholder="Type an item"
          required={true}
          name="itemRequested"
          label="Item"
        />
        <Button type="submit">Add</Button>
      </form>
      <RequestTable setError={setError} />
    </div>
  );
}
