"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MarkdownEditor from "@uiw/react-markdown-editor";

export interface IssuesPageProps {}

export default function IssuesPage(props: IssuesPageProps) {
  return (
    <div className="flex flex-col space-y-6 m-4 max-w-lg">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Issue title" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <div className=".wmde-markdown-var">
          <MarkdownEditor placeholder="Description" height="300px" />
        </div>
      </div>
      <Button>Create New Issue</Button>
    </div>
  );
}
