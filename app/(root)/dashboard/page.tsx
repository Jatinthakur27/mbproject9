"use client";

import { todos, users } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyLoader from "@/components/Loader";
import TodoCard from "@/components/TodoCard";

const DashboardPage = () => {
  const [allTodos, setAllTodos] = useState<
    {
      todos: InferInsertModel<typeof todos>;
      users: InferInsertModel<typeof users>;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/todos");
        setAllTodos(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      {allTodos.length === 0 ? (
        <p className="text-lg text-gray-500">No todos available.</p>
      ) : (
        <div className="w-full max-w-5xl h-[70vh] overflow-y-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {allTodos.map((todo, index) => (
              <TodoCard key={index} todo={todo} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
