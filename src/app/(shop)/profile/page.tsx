import ProfileSidebar from "@/components/profile/profile-sidebar";
import PersonalInfo from "@/components/profile/personal-info";
import RecentOrder from "@/components/profile/recent-order";
import SavedItems from "@/components/profile/saved-items";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
                        Hello, Alex!
                    </h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Welcome to your dashboard. Here's an overview of your account.
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar */}
                    <ProfileSidebar />

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Personal Information & Recent Order */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <PersonalInfo />
                            <RecentOrder />
                        </div>

                        {/* Saved Items */}
                        <SavedItems />
                    </div>
                </div>
            </div>
        </div>
    );
}
