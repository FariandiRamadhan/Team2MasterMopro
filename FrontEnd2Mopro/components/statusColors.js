import { StyleSheet } from "react-native";

// Pilihan warna untuk status meeting
export const statusColors = StyleSheet.create({
    success: {
        color: '#ffffff'
    },
    warning: {
        color: '#FFD600'
    },
    danger: {
        color: '#ffffff'
    },
    errorText: {
      color: '#dc3545'
    },
    bgSuccess: {
        backgroundColor: '#198754'
    },
    bgWarning: {
        backgroundColor: '#423F00'
    },
    bgDanger: {
        backgroundColor: '#dc3545'
    }
})

// Fungsi untuk menangani pilihan warna
export const handleWarna = (warna) => {
    let statusColor = {};
    if(warna === "succeed"){
      statusColor = {
        bgColor: statusColors.bgSuccess,
        color: statusColors.success
      }
    }else if(warna === "pending"){
      statusColor = {
        bgColor: statusColors.bgWarning,
        color: statusColors.warning
      }
    }else {
      statusColor = {
        bgColor: statusColors.bgDanger,
        color: statusColors.danger
      }
    }
    return statusColor;
}