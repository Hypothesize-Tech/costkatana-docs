import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
    title: string;
    content: React.ReactNode;
    code?: string;
    description?: string;
}

interface StepByStepGuideProps {
    steps: Step[];
    title?: string;
    onComplete?: () => void;
}

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ steps, title, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const totalSteps = steps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else if (onComplete) {
            onComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (index: number) => {
        setCurrentStep(index);
    };

    const markStepComplete = (index: number) => {
        setCompletedSteps((prev) => new Set(prev).add(index));
    };

    const isStepComplete = (index: number) => completedSteps.has(index);

    return (
        <div className="my-8 rounded-xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30 bg-gradient-to-r from-primary-500/10 to-accent-500/10">
                {title && (
                    <h3 className="text-2xl font-display font-bold gradient-text mb-2">{title}</h3>
                )}

                {/* Progress Bar */}
                <div className="w-full h-2 bg-primary-200/30 dark:bg-primary-700/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
            </div>

            {/* Step Indicators */}
            <div className="px-6 py-4 bg-light-bg-100 dark:bg-dark-bg-200 border-b border-primary-200/30 dark:border-primary-700/30">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <button
                                onClick={() => handleStepClick(index)}
                                className={`flex flex-col items-center gap-2 transition-all duration-200 ${index === currentStep
                                    ? 'scale-110'
                                    : 'hover:scale-105'
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${index === currentStep
                                        ? 'border-primary-500 bg-primary-500 text-white'
                                        : isStepComplete(index)
                                            ? 'border-success-500 bg-success-500 text-white'
                                            : 'border-primary-200 dark:border-primary-700 bg-transparent text-light-text-secondary dark:text-dark-text-secondary'
                                        }`}
                                >
                                    {isStepComplete(index) ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <span className="font-semibold">{index + 1}</span>
                                    )}
                                </div>
                                <span
                                    className={`text-xs font-medium text-center max-w-24 ${index === currentStep
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </button>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-0.5 mx-2 transition-all duration-200 ${index < currentStep
                                        ? 'bg-success-500'
                                        : 'bg-primary-200 dark:bg-primary-700'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-4">
                            <h4 className="text-xl font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                {steps[currentStep].title}
                            </h4>
                            {steps[currentStep].description && (
                                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                                    {steps[currentStep].description}
                                </p>
                            )}
                        </div>

                        <div className="prose dark:prose-invert max-w-none">
                            {steps[currentStep].content}
                        </div>

                        {steps[currentStep].code && (
                            <div className="mt-4 rounded-lg bg-gray-900 dark:bg-black p-4 overflow-x-auto">
                                <pre className="text-sm font-mono text-gray-100">
                                    <code>{steps[currentStep].code}</code>
                                </pre>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-primary-200/30 dark:border-primary-700/30 bg-light-bg-100 dark:bg-dark-bg-200 flex items-center justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="px-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-transparent hover:bg-primary-500/10 text-primary-600 dark:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                    <ChevronLeft size={18} />
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => markStepComplete(currentStep)}
                        className="px-4 py-2 rounded-lg border border-success-200 dark:border-success-700 bg-transparent hover:bg-success-500/10 text-success-600 dark:text-success-400 transition-all duration-200 flex items-center gap-2"
                    >
                        <CheckCircle size={18} />
                        Mark Complete
                    </button>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentStep === totalSteps - 1}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                    {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
                    {currentStep < totalSteps - 1 && <ChevronRight size={18} />}
                    {currentStep === totalSteps - 1 && <ArrowRight size={18} />}
                </button>
            </div>
        </div>
    );
};

export default StepByStepGuide;

