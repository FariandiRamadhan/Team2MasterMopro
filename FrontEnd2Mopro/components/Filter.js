import { useState } from 'react';

export default function Filter() {
  const filterMeetings = (meetings, searchParams) => {
    if (!meetings) return [];
    
    return meetings.filter(meeting => {
      // Jika ada input tanggal, prioritaskan filter tanggal
      if (searchParams.startDate && searchParams.endDate) {
        const meetingDate = new Date(meeting.date);
        const startDate = new Date(searchParams.startDate);
        const endDate = new Date(searchParams.endDate);
        return meetingDate >= startDate && meetingDate <= endDate;
      }
      
      // Jika tidak ada filter tanggal, gunakan filter judul
      if (searchParams.title) {
        return meeting.title.toLowerCase().includes(searchParams.title.toLowerCase());
      }

      // Jika tidak ada filter sama sekali, tampilkan semua
      return true;
    });
  };

  return { filterMeetings };
} 