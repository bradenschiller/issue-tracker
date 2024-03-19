"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createIssueSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function IssuesPage() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
  const { toast } = useToast();

  return (
    <form
      onSubmit={handleSubmit(async (issue) => {
        try {
          toast({
            variant: "default",
            title: "Issue created",
            description: "Your issue has been created successfully",
          });

          await axios.post("/api/issues", issue);
          reset();
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Failed to create issue",
          });

          throw new Error(`${error} - Failed to create issue`);
        }
      })}
      className="flex flex-col space-y-6 m-4 max-w-lg"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Issue title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <div className=".wmde-markdown-var">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MarkdownEditor
                {...field}
                placeholder="Description"
                height="300px"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      <Button>Create New Issue</Button>
    </form>
  );
}
