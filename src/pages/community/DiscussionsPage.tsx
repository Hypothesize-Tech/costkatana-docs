import React, { useState } from 'react';
import { DiscussionList, DiscussionThread, CreateDiscussionForm } from '../../components/community';

export const DiscussionsPage: React.FC = () => {
    const [selectedDiscussionId, setSelectedDiscussionId] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    if (selectedDiscussionId) {
        return (
            <div className="py-8 px-4">
                <DiscussionThread
                    discussionId={selectedDiscussionId}
                    onBack={() => setSelectedDiscussionId(null)}
                />
            </div>
        );
    }

    return (
        <div className="py-8 px-4">
            <DiscussionList
                onSelectDiscussion={setSelectedDiscussionId}
                onCreateDiscussion={() => setShowCreateForm(true)}
            />

            {showCreateForm && (
                <CreateDiscussionForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={(discussionId) => {
                        setShowCreateForm(false);
                        setSelectedDiscussionId(discussionId);
                    }}
                />
            )}
        </div>
    );
};

