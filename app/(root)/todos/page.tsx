"use client";
import MyLoader from "@/components/Loader";
import TodoCard from "@/components/TodoCard";
import { todos } from "@/db/schema";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { InferInsertModel } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const MyTodosPage = () => {
  const [myTodos, setMyTodos] = useState<InferInsertModel<typeof todos>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useKindeAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("/api/todos/user", {
          kindeId: user?.id,
        });
        setMyTodos(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">My Todos</h1>
      {myTodos.length === 0 ? (
        <p className="text-lg text-gray-500">No todos available.</p>
      ) : (
        <div className="w-full max-w-5xl h-[70vh] overflow-y-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {myTodos.map((todo, index) => (
              <TodoCard key={index} todo={todo} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyTodosPage;
