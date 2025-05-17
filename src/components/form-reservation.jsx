"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Dummy data
// ini entar diambil dari supabase datanya
const dummyData = {
  floors: ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
  rooms: {
    "1st Floor": ["A1", "A2", "A3", "A4", "A5"],
    "2nd Floor": ["B1", "B2", "B3", "B4", "B5"],
    "3rd Floor": ["C1", "C2", "C3", "C4", "C5"],
    "4th Floor": ["D1", "D2", "D3", "D4", "D5"],
  },

  timeSlots: [
    { hour: "08:00 AM - 10:30 AM", status: "Open" },
    { hour: "10:45 AM - 13:15 PM", status: "Closed" },
    { hour: "13:30 PM - 16:00 PM", status: "Open" },
    { hour: "16:15 PM - 18:45 PM", status: "Closed" },
    { hour: "19:00 PM - 21:30 PM", status: "Open" },
  ],
  currentUser: "Triemas Putra",
}

const RoomReservationForm = () => {
  const [formData, setFormData] = useState({
    floor: "",
    roomName: "",
    timeSlot: "",
    borrowerName: dummyData.currentUser,
    purpose: "",
  })

  const [availableRooms, setAvailableRooms] = useState([])

  useEffect(() => {
    if (formData.floor) {
      setAvailableRooms(dummyData.rooms[formData.floor] || [])
      setFormData((prev) => ({ ...prev, roomName: "" }))
    } else {
      setAvailableRooms([])
    }
  }, [formData.floor])

  // Fungsi untuk menghandle perubahan pada input form
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Diubah jadi logic untuk mengirim data ke supabase
    alert("Reservation submitted successfully!")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Room Reservation</CardTitle>
        <CardDescription>Book a room for class, meeting or event</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="floor">Floor</Label>
            <Select value={formData.floor} onValueChange={(value) => handleChange("floor", value)}>
              <SelectTrigger id="floor">
                <SelectValue placeholder="Select a floor" />
              </SelectTrigger>
              <SelectContent>
                {dummyData.floors.map((floor) => (
                  <SelectItem key={floor} value={floor}>
                    {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Select
              value={formData.roomName}
              onValueChange={(value) => handleChange("roomName", value)}
              disabled={!formData.floor}
            >
              <SelectTrigger id="roomName">
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlot">Time Slot</Label>
            <Select value={formData.timeSlot} onValueChange={(value) => handleChange("timeSlot", value)}>
              <SelectTrigger id="timeSlot">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                // ini entar diambil dari supabase datanya close sama opennya buat ditampilin di form
                {dummyData.timeSlots.map((slot) => (
                  <SelectItem key={slot.hour} value={slot.hour} disabled={slot.status === "Closed"}>
                    {slot.hour} {slot.status === "Closed" ? "(Closed)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="borrowerName">Borrower Name</Label>
            <Input id="borrowerName" value={formData.borrowerName} disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose / Reason</Label>
            <Textarea
              id="purpose"
              placeholder="Please describe the purpose of your reservation"
              value={formData.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={!formData.floor || !formData.roomName || !formData.timeSlot || !formData.purpose}
          >
            Submit Reservation
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RoomReservationForm
