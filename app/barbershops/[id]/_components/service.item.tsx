'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

import { Service } from '@prisma/client'
import { Button } from '@/app/_components/ui/button'
import { Calendar } from '@/app/_components/ui/calendar'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet'
import { ptBR } from 'date-fns/locale'
import { generateDayTimeList } from '../_helpers/hours'

interface ServiceItemProps {
  service: Service
  isAuthenticated?: boolean
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState<string | undefined>()

  const handleBooking = () => {
    if (!isAuthenticated) {
      return signIn('google')
    }

    // TODO abrir modal de agendamento
  }

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="font-bold text-primary text-sm">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBooking}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mt-6"
                    locale={ptBR}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />

                  {/* Mostrar lista de horários apenas se uma data estiver selecionada */}
                  {date && (
                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? 'default' : 'outline'}
                          className="rounded-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
