import { ArrowUpRight, Check, MessageCircleQuestion, Plus } from "lucide-react";

import { cn } from "~/lib/utils";

const questions = [
  {
    question: "Could this change be related to my medication?",
    recipient: "Prescriber",
  },
  {
    question: "What should I expect at the follow-up?",
    recipient: "Care team",
  },
  {
    question: "Is this still the right time to take it?",
    recipient: "Pharmacist",
  },
] as const;

export function QuestionsPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "surface-panel overflow-hidden rounded-[2rem] p-5 sm:p-6",
        className,
      )}
      aria-label="Illustrative Questions list in Medscribe"
    >
      <div className="flex items-start justify-between gap-5 px-1 pb-5">
        <div>
          <p className="text-primary text-xs font-bold tracking-[0.16em] uppercase">
            Questions
          </p>
          <h3 className="text-foreground mt-2 font-serif text-2xl font-semibold tracking-[-0.02em]">
            Ready for the conversation
          </h3>
        </div>
        <span className="bg-primary-light text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
          <MessageCircleQuestion className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="bg-canvas/70 overflow-hidden rounded-[1.35rem]">
        {questions.map((item, index) => (
          <div
            key={item.question}
            className={cn(
              "grid grid-cols-[1fr_auto] gap-4 px-4 py-4 sm:px-5",
              index > 0 && "border-border-soft/55 border-t",
            )}
          >
            <div className="min-w-0">
              <p className="text-foreground text-sm leading-snug font-semibold text-pretty">
                {item.question}
              </p>
              <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
                Ask your {item.recipient.toLowerCase()}
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </p>
            </div>
            <span className="bg-success-light text-success mt-0.5 flex size-6 items-center justify-center rounded-full">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        ))}
      </div>

      <div className="text-muted-foreground mt-5 flex items-center gap-2 px-1 text-xs leading-relaxed">
        <span className="bg-primary-light text-primary flex size-7 shrink-0 items-center justify-center rounded-full">
          <Plus className="size-3.5" aria-hidden="true" />
        </span>
        Save a question the moment it comes to you.
      </div>
    </div>
  );
}
