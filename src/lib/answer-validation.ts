export function validateFreeResponse(
  userAnswer: string,
  acceptableAnswers: string[]
): boolean {
  const normalized = userAnswer.trim().toLowerCase();
  if (!normalized) return false;
  return acceptableAnswers.some((a) => {
    const target = a.trim().toLowerCase();
    return (
      normalized === target ||
      normalized.includes(target) ||
      target.includes(normalized)
    );
  });
}

export function validateSpelling(
  userAnswer: string,
  correctAnswer: string,
  acceptableSpellings: string[] = []
): boolean {
  const normalized = userAnswer.trim().toLowerCase();
  if (!normalized) return false;
  const allAcceptable = [correctAnswer, ...acceptableSpellings].map((s) =>
    s.trim().toLowerCase()
  );
  return allAcceptable.includes(normalized);
}
