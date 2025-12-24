'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Settings as SettingsIcon,
  Building2,
  Bell,
  CreditCard,
  Users,
  Mail,
  Shield,
  Check,
  X,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('business-info')
  const [businessSettings, setBusinessSettings] = useState({
    name: 'Brooklyn Hills Apartments',
    email: 'info@brooklynhills.ng',
    phone: '+234 XXX XXX XXXX',
    whatsapp: '+234 XXX XXX XXXX',
    address: 'Uyo, Akwa Ibom State, Nigeria',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newBooking: true,
    bookingCancellation: true,
    checkInReminder: true,
    checkOutReminder: true,
    lowInventory: true,
    maintenanceAlerts: true,
    paymentReceived: true,
    reviews: true,
  })

  const [bookingSettings, setBookingSettings] = useState({
    minBookingDays: '1',
    maxBookingDays: '30',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    advanceBookingDays: '90',
    instantBooking: true,
    requireDeposit: true,
    depositPercentage: '30',
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paystackEnabled: true,
    paystackPublicKey: 'pk_test_xxxxxxxxxxxxx',
    acceptCash: true,
    acceptTransfer: true,
    acceptCard: true,
  })

  const handleSave = () => {
    // TODO: Implement settings save
    console.log('Saving settings...', {
      businessSettings,
      notificationSettings,
      bookingSettings,
      paymentSettings,
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your business configuration and preferences
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => scrollToSection('business-info')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'business-info'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  Business Info
                </button>
                <button
                  onClick={() => scrollToSection('notifications')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'notifications'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </button>
                <button
                  onClick={() => scrollToSection('payment')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'payment'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Payment
                </button>
                <button
                  onClick={() => scrollToSection('user-management')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'user-management'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  User Management
                </button>
                <button
                  onClick={() => scrollToSection('security')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'security'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Security
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Information */}
          <Card id="business-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessSettings.name}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) =>
                      setBusinessSettings((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={businessSettings.phone}
                    onChange={(e) =>
                      setBusinessSettings((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={businessSettings.whatsapp}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({ ...prev, whatsapp: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={businessSettings.address}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({ ...prev, address: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={businessSettings.currency}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={businessSettings.timezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card id="notifications">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="newBooking">New Booking Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive alerts when new bookings are made
                  </p>
                </div>
                <Switch
                  id="newBooking"
                  checked={notificationSettings.newBooking}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, newBooking: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="cancellation">Cancellation Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified of booking cancellations</p>
                </div>
                <Switch
                  id="cancellation"
                  checked={notificationSettings.bookingCancellation}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, bookingCancellation: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="checkIn">Check-in Reminders</Label>
                  <p className="text-sm text-gray-500">Reminders for upcoming check-ins</p>
                </div>
                <Switch
                  id="checkIn"
                  checked={notificationSettings.checkInReminder}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, checkInReminder: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="checkOut">Check-out Reminders</Label>
                  <p className="text-sm text-gray-500">Reminders for upcoming check-outs</p>
                </div>
                <Switch
                  id="checkOut"
                  checked={notificationSettings.checkOutReminder}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, checkOutReminder: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="inventory">Low Inventory Alerts</Label>
                  <p className="text-sm text-gray-500">Alerts for low stock items</p>
                </div>
                <Switch
                  id="inventory"
                  checked={notificationSettings.lowInventory}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, lowInventory: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="maintenance">Maintenance Alerts</Label>
                  <p className="text-sm text-gray-500">Notifications for maintenance issues</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={notificationSettings.maintenanceAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, maintenanceAlerts: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Booking Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minBooking">Minimum Booking (Days)</Label>
                  <Input
                    id="minBooking"
                    type="number"
                    value={bookingSettings.minBookingDays}
                    onChange={(e) =>
                      setBookingSettings((prev) => ({...prev, minBookingDays: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="maxBooking">Maximum Booking (Days)</Label>
                  <Input
                    id="maxBooking"
                    type="number"
                    value={bookingSettings.maxBookingDays}
                    onChange={(e) =>
                      setBookingSettings((prev) => ({ ...prev, maxBookingDays: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkInTime">Default Check-in Time</Label>
                  <Input
                    id="checkInTime"
                    type="time"
                    value={bookingSettings.checkInTime}
                    onChange={(e) =>
                      setBookingSettings((prev) => ({ ...prev, checkInTime: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="checkOutTime">Default Check-out Time</Label>
                  <Input
                    id="checkOutTime"
                    type="time"
                    value={bookingSettings.checkOutTime}
                    onChange={(e) =>
                      setBookingSettings((prev) => ({ ...prev, checkOutTime: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="instantBooking">Enable Instant Booking</Label>
                  <p className="text-sm text-gray-500">Allow guests to book without approval</p>
                </div>
                <Switch
                  id="instantBooking"
                  checked={bookingSettings.instantBooking}
                  onCheckedChange={(checked) =>
                    setBookingSettings((prev) => ({ ...prev, instantBooking: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="requireDeposit">Require Deposit</Label>
                  <p className="text-sm text-gray-500">Require upfront payment deposit</p>
                </div>
                <Switch
                  id="requireDeposit"
                  checked={bookingSettings.requireDeposit}
                  onCheckedChange={(checked) =>
                    setBookingSettings((prev) => ({ ...prev, requireDeposit: checked }))
                  }
                />
              </div>

              {bookingSettings.requireDeposit && (
                <div>
                  <Label htmlFor="depositPercent">Deposit Percentage (%)</Label>
                  <Input
                    id="depositPercent"
                    type="number"
                    value={bookingSettings.depositPercentage}
                    onChange={(e) =>
                      setBookingSettings((prev) => ({
                        ...prev,
                        depositPercentage: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card id="payment">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label>Paystack Integration</Label>
                  <p className="text-sm text-gray-500">Enable online card payments</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={paymentSettings.paystackEnabled ? 'success' : 'default'}>
                    {paymentSettings.paystackEnabled ? 'Active' : 'Inactive'}
                  </Badge>
                  <Switch
                    checked={paymentSettings.paystackEnabled}
                    onCheckedChange={(checked) =>
                      setPaymentSettings((prev) => ({ ...prev, paystackEnabled: checked }))
                    }
                  />
                </div>
              </div>

              {paymentSettings.paystackEnabled && (
                <div>
                  <Label htmlFor="paystackKey">Paystack Public Key</Label>
                  <Input
                    id="paystackKey"
                    type="text"
                    value={paymentSettings.paystackPublicKey}
                    onChange={(e) =>
                      setPaymentSettings((prev) => ({ ...prev, paystackPublicKey: e.target.value }))
                    }
                  />
                </div>
              )}

              <div className="pt-4 border-t">
                <Label className="mb-3 block">Accepted Payment Methods</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cash">Cash Payment</Label>
                    <Switch
                      id="cash"
                      checked={paymentSettings.acceptCash}
                      onCheckedChange={(checked) =>
                        setPaymentSettings((prev) => ({ ...prev, acceptCash: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transfer">Bank Transfer</Label>
                    <Switch
                      id="transfer"
                      checked={paymentSettings.acceptTransfer}
                      onCheckedChange={(checked) =>
                        setPaymentSettings((prev) => ({ ...prev, acceptTransfer: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="card">Card Payment (via Paystack)</Label>
                    <Switch
                      id="card"
                      checked={paymentSettings.acceptCard}
                      onCheckedChange={(checked) =>
                        setPaymentSettings((prev) => ({ ...prev, acceptCard: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card id="user-management">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Admin Users</Label>
                <p className="text-sm text-gray-500 mb-3">
                  Manage staff access and permissions
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-gray-500">admin@brooklynhills.ng</p>
                    </div>
                    <Badge>Owner</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card id="security">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              <Button className="w-full">Update Password</Button>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Badge variant="default">Disabled</Badge>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
