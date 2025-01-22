//  Menghandle perubahan input waktu
export const dateHandler = (rawDate) => {
    // Menghapus karakter non-numeric
    let cleanInput = rawDate.replace(/[^0-9]/g, '');
    let formattedDate = "";
    let date = new Date();
    let tanggal = (date.getDate() + 1).toString().length == 1? (date.getDate() + 1).toString().padStart(2,"0") : (date.getDate() + 1).toString();
    let bulan = (date.getMonth() + 1).toString().length == 1? (date.getMonth() + 1).toString().padStart(2,"0") : (date.getMonth() + 1).toString();

    // Mengecek agar input digit pertama dan kedua tidak melebihi tanggal 31
    cleanInput = cleanInput.slice(0, 2) > 31? tanggal : cleanInput;

    // Mengecek agar input digit ketiga dan keempat tidak melebihi 12 bulan
    cleanInput = cleanInput.slice(2,4) > 12? cleanInput.slice(0,2) + bulan : cleanInput;

    
    if(cleanInput.length == 8){
      // Tahun meeting agenda tidak dapat kurang dari tahun ini
      cleanInput = cleanInput.slice(4,8) < date.getFullYear()? cleanInput.slice(0,4) + date.getFullYear().toString() : cleanInput;
    }

    // Membatasi input dd/MM/YYYY
    cleanInput = cleanInput.slice(0, 8);

    // Jika panjang input lebih dari 4 maka akan muncul dua "/", contoh : "20/10/1"
    if (cleanInput.length >= 4) {
      // cleanInput = cleanInput.slice(4,8) < date.getFullYear()? cleanInput.slice(0,4) + date.getFullYear() : cleanInput;
      formattedDate = `${cleanInput.slice(0, 2)}/${cleanInput.slice(2, 4)}/${cleanInput.slice(4, 8)}`;

    // Jika panjang input lebih dari 2 maka akan muncul satu "/", contoh : "20/1"
    } else if(cleanInput.length >= 2) {
      formattedDate = `${cleanInput.slice(0, 2)}/${cleanInput.slice(2, 4)}`;
    } else {
      formattedDate = cleanInput;
    }

    return formattedDate;
  }

  // Menghandle perubahan input waktu
  /**
   * 
   * @param {string} rawTime string waktu untuk diformat
   * @returns string waktu dengan format HH:mm, contoh: 23:59
   */
export const timeHandler = (rawTime) => {
    let cleanInput = rawTime.replace(':', '');
    let formattedTime = "";

    // Menghapus input non-numeric
    cleanInput = cleanInput.replace(/[^0-9]/g, '');

    // Mengecek agar input digit pertama dan kedua tidak melebihi jam 23
    cleanInput = cleanInput.slice(0, 2) > 23? '00' : cleanInput;

    // Mengecek agar input digit ketiga dan keempat tidak melebihi menit 59
    cleanInput = cleanInput.slice(2,4) > 59? cleanInput.slice(0,2) + "00" : cleanInput;

    // Membatasi input sampai 4 digit saja
    cleanInput = cleanInput.slice(0, 4);
    
    // Menambahkan ":" jika input lebih dari 2 digit
    if (cleanInput.length >= 2) {
      formattedTime = cleanInput.slice(0, 2) + ':' + cleanInput.slice(2);
    } else {
      formattedTime = cleanInput;
    }

    return formattedTime;
  }