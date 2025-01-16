"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(0),
  description: z.string().optional(),
});

export default function MyForm() {
  const { toast } = useToast();
  const { user } = useKindeAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newTodo = {
        title: values.title,
        description: values.description || "",
        createdBy: user?.id,
      };

      await axios.post("/api/todos", newTodo);

      toast({
        title: "Create Todo",
        description: "Successfully created a todo.",
      });

      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl py-10 m-4 sm:m-6 md:m-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="title"
                  type="text"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description"
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
