
/**
 * 
 * @returns mengembalikan filterMeetings function yang dapat diisi 2 argument, berfungsi untuk memfilter searching
 */
export default function Filter() {

  /**
   * 
   * @param {Array} meetings array yang berisi satu atau lebih object, yang dimana object ini adalah detail meeting
   * @param {Array} searchParams array yang berisi hal-hal apa saja yang dicari {title:'', startDate:'', endDate:''}
   * @returns Array hasil filter
   */
  const filterMeetings = (meetings, searchParams) => {
    if (!meetings) return [];

    return meetings.filter(meeting => {
      // Jika ada input tanggal, prioritaskan filter tanggal
      if (searchParams.startDate && searchParams.endDate) {
        const meetingDate = new Date(parseDate(meeting.meeting_time.tanggal));
        const startDate = new Date(searchParams.startDate);
        const endDate = new Date(searchParams.endDate);
        return meetingDate >= startDate && meetingDate <= endDate;
      }
      
      // Jika tidak ada filter tanggal, gunakan filter judul
      if (searchParams.title) {
        return meeting.judul.toLowerCase().includes(searchParams.title.toLowerCase());
      }

      // Jika tidak ada filter sama sekali, tampilkan semua
      return true;
    });
  };

  return { filterMeetings };
} 

/**
 * 
 * @param {string} tanggal tanggal meeting dalam bentuk string dengan format dd/MM/yyyy
 * @returns string tanggal dalam format MM/dd/yyyy yang bisa digunakan untuk javascript Date object
 */
function parseDate(tanggal) {
  const [day, month, year] = tanggal.split("/"); // Split and convert to numbers
  return `${month}/${day}/${year}`; // Months are 0-based in JavaScript
}