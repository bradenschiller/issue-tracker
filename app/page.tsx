import { Issue } from "@/lib/schema";
import DataTable from "./DataTable";
import { db } from "./api/issues/route";
import moment from "moment";

export async function getIssueData() {
  const issues = await db.query.issue.findMany();
  const formattedIssues = issues.map((issue) => {
    return {
      ...issue,
      createdAt: moment(issue.createdAt).format("MMMM DD, YYYY h:mmA"),
    };
  });

  return formattedIssues;
}

export default async function Home() {
  const issueData = await getIssueData();

  return (
    <div className="p-2 m-2">
      <DataTable data={issueData} />
    </div>
  );
}
