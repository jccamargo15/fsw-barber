import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D]">
          Confirmado
        </Badge>
        <h2 className="font-bold">Corte de cabelo</h2>
        <div className="flex">
          <Avatar>
            <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
