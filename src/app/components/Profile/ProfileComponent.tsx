import { AvatarImage, AvatarFallback, Avatar } from "@/app/components/ui/avatar"
import { CardTitle, CardHeader, CardContent, Card } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"

type ProfileComponentProps = {
  address: `0x${string}`
  icon?: string
}

export default function ProfileComponent({ address }: ProfileComponentProps) {
  const profileIcon = `https://api.cloudnouns.com/v1/pfp?text=${address}`

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <Avatar className="h-24 w-24">
        <AvatarImage alt="user-profile" src={profileIcon} />
        <AvatarFallback>Loading ..</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="font-medium text-lg">Nickname</h2>
        <p className="text-gray-500">{address}</p>
      </div>
      <Badge className="items-center">
        <UserIcon className="h-5 w-5 mr-2" />
        User Score: 85
      </Badge>
      <Badge className="items-center">
        <UserIcon className="h-5 w-5 mr-2" />
        Events Attended: 85
      </Badge>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Met Wallet Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>wallet_address_1</li>
            <li>wallet_address_2</li>
            <li>wallet_address_3</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Events Attended</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Event 1</li>
            <li>Event 2</li>
            <li>Event 3</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}


function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}