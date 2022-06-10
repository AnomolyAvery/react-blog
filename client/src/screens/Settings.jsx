import React from 'react';
import SettingsForm from '../components/SettingsForm';

const Settings = () => {
    return (
        <div>
            <div className="w-full bg-white dark:bg-neutral-900 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <SettingsForm />
                </div>
            </div>
        </div>
    );
};

export default Settings;
