import { useState, useEffect } from 'react';

export interface IDate {
  weekDay: string;
  monthDay: number;
  month: string;
  time: string;
}

function useCurrentDate(): IDate {
  const [dateInfo, setDateInfo] = useState<IDate>({
    weekDay: '',
    monthDay: 0,
    month: '',
    time: ''
  });

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOfMonth = today.getDate();
    const month = today.getMonth();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const hour12 = hours % 12 || 12; 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    setDateInfo({
      weekDay: daysOfWeek[dayOfWeek],
      monthDay: dayOfMonth,
      month: monthsOfYear[month],
      time: formattedTime
    });
  }, []); 

  return dateInfo;
}

export default useCurrentDate;
