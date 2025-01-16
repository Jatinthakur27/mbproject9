import { InferInsertModel } from "drizzle-orm";
import { todos, users } from "@/db/schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

interface Props {
  todo:
    | {
        todos: InferInsertModel<typeof todos>;
        users: InferInsertModel<typeof users>;
      }
    | InferInsertModel<typeof todos>;
}

const TodoCard = ({ todo }: Props) => {
  let title, description, currentUser;

  if ("todos" in todo) {
    title = todo.todos.title;
    description = todo.todos.description;
    currentUser = todo.users;
  } else {
    title = todo.title;
    description = todo.description;
  }

  return (
    <Card className="w-full max-w-sm shadow-lg border rounded-lg p-4 space-y-4 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 mt-4">
        {currentUser && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 italic">
              Created by:{" "}
              <span className="font-semibold">{currentUser.username}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoCard;
