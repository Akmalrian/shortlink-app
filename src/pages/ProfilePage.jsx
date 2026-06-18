import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../component/templates/DashboardLayout'
import Button from '../component/atoms/Button'

function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {user?.email?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-400">User ID: {user?.id}</p>
            </div>
          </div>
          <Button variant="danger" className="w-full" onClick={logout}>
            Log Out
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage