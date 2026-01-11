import DashboardLayout from '@/components/layout/DashboardLayout';
import DataView from '@/components/dashboard/DataView';
import ChatInterface from '@/components/dashboard/ChatInterface';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Data Area - Takes up more space */}
        <div className="lg:col-span-2 h-full">
          <DataView />
        </div>

        {/* Chat Area - Fixed on right */}
        <div className="lg:col-span-1 h-full">
          <ChatInterface />
        </div>
      </div>
    </DashboardLayout>
  );
}
