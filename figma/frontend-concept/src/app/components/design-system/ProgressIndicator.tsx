interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex items-center">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index < currentStep
                      ? 'bg-[--success] border-[--success] text-white'
                      : index === currentStep
                      ? 'bg-[--institutional-primary] border-[--institutional-primary] text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {index < currentStep ? '✓' : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-[--success]' : 'bg-slate-300'
                  }`} />
                )}
              </div>
              <span className={`text-xs mt-2 text-center ${
                index <= currentStep ? 'text-slate-700' : 'text-slate-400'
              }`}>
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
