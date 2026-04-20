import { redirect } from "next/navigation";

export default async function NewQuizPage({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  redirect(`/courses/${cid}/quizzes`);
}

